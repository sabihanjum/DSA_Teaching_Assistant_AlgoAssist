
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Gift, Award, Trophy, Star } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ReminderDialog from './ReminderDialog';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastActivity: string;
  showReward: boolean;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ 
  currentStreak, 
  longestStreak, 
  lastActivity,
  showReward
}) => {
  const { toast } = useToast();
  const weekProgress = (currentStreak % 7) || 7;
  const daysUntilReward = 7 - weekProgress;

  const viewRewards = () => {
    toast({
      title: "Premium Problems Unlocked!",
      description: "You've unlocked exclusive company interview problems. Check the Practice section.",
    });
  };

  return (
    <Card className="border-indigo-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          Daily Streak
        </CardTitle>
        <CardDescription>Keep your streak going to earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
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
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-md border border-indigo-100 mb-4">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <Gift className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <h4 className="font-medium text-sm">Weekly Reward Unlocked!</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  You've completed 7 days of practice. Claim your reward to access premium interview problems.
                </p>
                <Button 
                  size="sm" 
                  onClick={viewRewards}
                  className="bg-indigo-600 hover:bg-indigo-700 text-xs h-8"
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
                <Award className="h-5 w-5 text-indigo-600" />
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
        
        <div className="flex justify-between">
          <div className="text-xs text-muted-foreground">
            Last activity: {lastActivity}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs p-0 h-auto">
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
