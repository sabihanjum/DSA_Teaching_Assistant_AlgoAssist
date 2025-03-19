
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Gift, Award, Trophy, Star, BookText, PlusCircle, Bookmark } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReminderDialog from './ReminderDialog';
import { useAuth } from '@/context/AuthContext';

interface RevisionNote {
  date: string;
  content: string;
}

const StreakTracker: React.FC = () => {
  const { toast } = useToast();
  const { user, recordActivity } = useAuth();
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState<RevisionNote[]>([]);
  
  // Streak state
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActivity, setLastActivity] = useState("");
  const [weekProgress, setWeekProgress] = useState(0);
  const [showReward, setShowReward] = useState(false);
  
  // Load streak data on component mount
  useEffect(() => {
    if (user) {
      loadStreakData();
      loadNotes();
      recordActivity(); // Record today's activity
    }
  }, [user]);
  
  const loadStreakData = () => {
    if (!user) return;
    
    const streakKey = `streak-${user.id}`;
    const storedData = localStorage.getItem(streakKey);
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setCurrentStreak(data.currentStreak);
        setLongestStreak(data.longestStreak);
        setLastActivity(formatLastActivity(data.lastLoginDate));
        
        // Calculate week progress (1-7)
        const progress = data.currentStreak % 7 || 7;
        setWeekProgress(progress);
        setShowReward(progress === 7);
        
      } catch (error) {
        console.error('Failed to parse streak data', error);
      }
    }
  };
  
  const loadNotes = () => {
    if (!user) return;
    
    const notesKey = `notes-${user.id}`;
    const storedNotes = localStorage.getItem(notesKey);
    
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Failed to parse notes', error);
      }
    } else {
      // Set default notes for new users
      const defaultNotes = [
        { date: "Today", content: "Learned linked list traversal and binary search implementation" },
        { date: "Yesterday", content: "Studied stack and queue data structures" }
      ];
      setNotes(defaultNotes);
      localStorage.setItem(notesKey, JSON.stringify(defaultNotes));
    }
  };
  
  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString() + ` at ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
    }
  };
  
  const viewRewards = () => {
    // Mark reward as claimed
    if (user) {
      const streakKey = `streak-${user.id}`;
      const storedData = localStorage.getItem(streakKey);
      
      if (storedData) {
        try {
          const data = JSON.parse(storedData);
          data.rewardClaimed = true;
          localStorage.setItem(streakKey, JSON.stringify(data));
        } catch (error) {
          console.error('Failed to update streak data', error);
        }
      }
    }
    
    toast({
      title: "Premium Problems Unlocked!",
      description: "You've unlocked exclusive company interview problems. Check the Practice section.",
    });
  };

  const addRevisionNote = () => {
    if (!user || !noteContent.trim()) return;
    
    const notesKey = `notes-${user.id}`;
    const newNote = {
      date: new Date().toLocaleDateString(),
      content: noteContent
    };
    
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem(notesKey, JSON.stringify(updatedNotes));
    setNoteContent("");
    
    // Record activity when adding a note
    recordActivity();
    
    toast({
      title: "Revision Note Added",
      description: "Keep tracking your learning journey!",
    });
  };

  const daysUntilReward = 7 - weekProgress;

  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          Daily Streak
        </CardTitle>
        <CardDescription>Keep your streak going to earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="font-medium">{currentStreak} day streak</span>
          </div>
          <span className="text-sm text-muted-foreground">Best: {longestStreak} days</span>
        </div>
        
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span>Weekly Progress</span>
            <span>{weekProgress}/7 days</span>
          </div>
          <Progress value={(weekProgress / 7) * 100} className="h-2 bg-slate-100" />
        </div>
        
        {showReward ? (
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-3 rounded-md border border-purple-100 mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Weekly Reward Unlocked!</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  You've completed 7 days of practice. Claim your reward to access premium interview problems.
                </p>
                <Button 
                  size="sm" 
                  onClick={viewRewards}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-xs h-8"
                >
                  Claim Reward
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-secondary/30 p-3 rounded-md border border-secondary/20 mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-full">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Keep Going!</h4>
                <p className="text-xs text-muted-foreground">
                  {daysUntilReward} more day{daysUntilReward !== 1 ? 's' : ''} until you unlock exclusive company interview problems.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Revision Notes Section - Made more prominent */}
        <div className="mb-3">
          <div className="bg-indigo-50 rounded-md p-3 mb-3 border border-indigo-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <BookText className="h-5 w-5 text-indigo-600" />
                <span className="font-medium text-indigo-700">My Revision Notes</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Note
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Revision Note</DialogTitle>
                    <DialogDescription>
                      Keep track of what you've learned today to help with your revision.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Textarea
                      placeholder="What did you learn today? (e.g., Mastered binary search algorithm)"
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={addRevisionNote}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                      Save Note
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <ScrollArea className="h-[130px] rounded-md">
              <div className="space-y-2 pr-2">
                {notes.map((note, index) => (
                  <div key={index} className="bg-white p-3 rounded-md border border-indigo-100 text-sm shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-indigo-700 flex items-center gap-1.5">
                        <Bookmark className="h-3.5 w-3.5" />
                        {note.date}
                      </div>
                    </div>
                    <div className="text-slate-700">{note.content}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Last activity: {lastActivity}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs p-0 h-auto text-purple-600 hover:text-purple-800">
                Set Reminder
              </Button>
            </DialogTrigger>
            <ReminderDialog />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakTracker;
