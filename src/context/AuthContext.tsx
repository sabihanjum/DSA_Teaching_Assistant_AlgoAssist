import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { UserLevel } from '@/components/UserLevelSelection';

interface User {
  id: string;
  email: string;
  username: string;
  level?: UserLevel;
  isFirstLogin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserLevel: (level: UserLevel) => void;
  recordActivity: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Initialize or update streak when user is loaded
        updateUserStreakOnLogin();
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Initialize or update user streak
  const updateUserStreakOnLogin = () => {
    const today = new Date().toLocaleDateString();
    const userId = user?.id;
    
    if (!userId) return;

    const streakKey = `streak-${userId}`;
    let streakData = localStorage.getItem(streakKey);
    
    if (!streakData) {
      // First time user, initialize streak data
      const initialStreak = {
        currentStreak: 1,
        longestStreak: 1,
        lastLoginDate: today,
        weeklyProgress: [1, 0, 0, 0, 0, 0, 0], // Today is active
      };
      localStorage.setItem(streakKey, JSON.stringify(initialStreak));
      return;
    }
    
    try {
      const parsedData = JSON.parse(streakData);
      const lastLoginDate = parsedData.lastLoginDate;
      
      // Already logged in today
      if (lastLoginDate === today) {
        return;
      }
      
      // Check if the last login was yesterday
      const lastDate = new Date(lastLoginDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const isConsecutiveDay = lastDate.toLocaleDateString() === yesterday.toLocaleDateString();
      
      // Update weekly progress
      let weeklyProgress = [...parsedData.weeklyProgress];
      weeklyProgress.pop(); // Remove oldest day
      weeklyProgress.unshift(1); // Add today
      
      if (isConsecutiveDay) {
        // Continue streak
        const newStreak = parsedData.currentStreak + 1;
        const newLongest = Math.max(newStreak, parsedData.longestStreak);
        
        const updatedData = {
          ...parsedData,
          currentStreak: newStreak,
          longestStreak: newLongest,
          lastLoginDate: today,
          weeklyProgress,
        };
        
        localStorage.setItem(streakKey, JSON.stringify(updatedData));
        
        // Show streak milestone notification
        if (newStreak % 7 === 0) {
          toast({
            title: "Weekly Streak Achievement!",
            description: "You've unlocked premium features for maintaining your streak!",
          });
        }
      } else {
        // Streak broken, reset to 1
        const updatedData = {
          ...parsedData,
          currentStreak: 1,
          lastLoginDate: today,
          weeklyProgress,
        };
        
        localStorage.setItem(streakKey, JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  // Record any user activity (can be used for specific activities)
  const recordActivity = () => {
    if (!user) return;
    
    const today = new Date().toLocaleDateString();
    const streakKey = `streak-${user.id}`;
    let streakData = localStorage.getItem(streakKey);
    
    if (!streakData) {
      // Initialize if not exists
      updateUserStreakOnLogin();
      return;
    }
    
    try {
      const parsedData = JSON.parse(streakData);
      
      // Update last activity time for today
      const updatedData = {
        ...parsedData,
        lastLoginDate: today,
      };
      
      localStorage.setItem(streakKey, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error recording activity:', error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate credentials against a backend
      // For demo purposes, we'll accept any login with email and password length > 5
      if (email && password.length > 5) {
        // Check if this user exists in localStorage (simulating a database)
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = existingUsers.find((u: User) => u.email === email);
        
        let userData: User;
        
        if (foundUser) {
          // Existing user
          userData = foundUser;
        } else {
          // New user (only for demo purposes in case someone tries to login without signing up first)
          userData = {
            id: `user-${Date.now()}`,
            email,
            username: email.split('@')[0],
            isFirstLogin: true,
          };
        }
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Initialize or update streak data
        setTimeout(() => updateUserStreakOnLogin(), 100);
        
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
        
        // If it's their first login and they don't have a level set, redirect to dashboard
        // The level selection dialog will be shown by the Dashboard component
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Login failed, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would register the user in a backend
      // For demo purposes, we'll create a user with the provided details
      if (email && username && password.length > 5) {
        const userData: User = {
          id: `user-${Date.now()}`,
          email,
          username,
          isFirstLogin: true,
        };
        
        // Store in localStorage for demo persistence
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        localStorage.setItem('users', JSON.stringify([...existingUsers, userData]));
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Initialize streak data for new user
        setTimeout(() => updateUserStreakOnLogin(), 100);
        
        toast({
          title: "Account created",
          description: "Your account has been created successfully",
        });
        
        navigate('/dashboard');
      } else {
        throw new Error('Invalid registration details');
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Signup failed, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserLevel = (level: UserLevel) => {
    if (user) {
      const updatedUser = { 
        ...user, 
        level, 
        isFirstLogin: false 
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Also update in the users array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = existingUsers.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserLevel,
        recordActivity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
