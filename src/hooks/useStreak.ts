
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from './use-toast';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string;
  weeklyProgress: number[];
}

export function useStreak() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastLoginDate: '',
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0], // Track last 7 days
  });

  // Load streak data from localStorage when component mounts
  useEffect(() => {
    if (user) {
      loadStreakData();
      updateStreak();
    }
  }, [user]);

  const loadStreakData = () => {
    if (!user) return;
    
    const storedData = localStorage.getItem(`streak-${user.id}`);
    if (storedData) {
      try {
        setStreakData(JSON.parse(storedData));
      } catch (error) {
        console.error('Failed to parse streak data', error);
      }
    }
  };

  const saveStreakData = (data: StreakData) => {
    if (!user) return;
    localStorage.setItem(`streak-${user.id}`, JSON.stringify(data));
    setStreakData(data);
  };

  const updateStreak = () => {
    if (!user) return;

    const today = new Date().toLocaleDateString();
    
    // If it's the first time tracking streak
    if (!streakData.lastLoginDate) {
      const newData = {
        ...streakData,
        currentStreak: 1,
        longestStreak: 1,
        lastLoginDate: today,
        weeklyProgress: [1, 0, 0, 0, 0, 0, 0],
      };
      saveStreakData(newData);
      return;
    }

    // If already logged in today, don't update the streak
    if (streakData.lastLoginDate === today) {
      return;
    }

    // Check if the last login was yesterday
    const lastLoginDate = new Date(streakData.lastLoginDate);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isConsecutiveDay = lastLoginDate.toLocaleDateString() === yesterday.toLocaleDateString();
    
    // Update weekly progress - shift array and add today's activity
    let weeklyProgress = [...streakData.weeklyProgress];
    weeklyProgress.pop(); // Remove the oldest day
    weeklyProgress.unshift(1); // Add today as active
    
    if (isConsecutiveDay) {
      // Continue the streak
      const newStreak = streakData.currentStreak + 1;
      const newLongest = Math.max(newStreak, streakData.longestStreak);
      
      const newData = {
        ...streakData,
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastLoginDate: today,
        weeklyProgress,
      };
      
      saveStreakData(newData);
      
      // If reached 7 days, show a toast notification
      if (newStreak % 7 === 0) {
        toast({
          title: "🔥 Streak Milestone!",
          description: `You've reached a ${newStreak} day streak! Keep it up!`,
        });
      }
    } else {
      // Streak broken, reset to 1
      const newData = {
        ...streakData,
        currentStreak: 1,
        lastLoginDate: today,
        weeklyProgress,
      };
      
      saveStreakData(newData);
      
      // Only show a message if they actually had a streak going
      if (streakData.currentStreak > 1) {
        toast({
          title: "Streak Reset",
          description: "Your streak has been reset. Keep practicing daily to build it back up!",
          variant: "destructive",
        });
      }
    }
  };

  const recordActivity = () => {
    // This function can be used to mark specific activities
    // For now, it just ensures the streak is updated for today
    updateStreak();
  };

  return {
    ...streakData,
    updateStreak,
    recordActivity,
    weekProgress: streakData.currentStreak % 7 || 7, // Days completed in current week (1-7)
  };
}
