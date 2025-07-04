
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import FadeIn from '@/components/animations/FadeIn';
import UserLevelSelection, { UserLevel } from '@/components/UserLevelSelection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, BookOpen, Code, Clock, BookMarked, MessageCircle, PenTool, LayoutList } from 'lucide-react';
import StreakTracker from '@/components/dashboard/StreakTracker';
import CompanyProblems from '@/components/dashboard/CompanyProblems';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, updateUserLevel, recordActivity } = useAuth();
  const [showLevelDialog, setShowLevelDialog] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const companyProblems = [
    { id: 101, title: 'Two Sum', company: 'Google', difficulty: 'Easy', locked: false },
    { id: 102, title: 'LRU Cache', company: 'Amazon', difficulty: 'Medium', locked: true },
    { id: 103, title: 'Merge Intervals', company: 'Microsoft', difficulty: 'Medium', locked: false },
    { id: 104, title: 'Word Break', company: 'Facebook', difficulty: 'Hard', locked: true },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      recordActivity();
      
      checkUnlockedStatus();
    }
    
    if (user?.isFirstLogin && !user?.level) {
      setShowLevelDialog(true);
    }
  }, [user, isAuthenticated]);
  
  const checkUnlockedStatus = () => {
    if (!user) return;
    
    const streakKey = `streak-${user.id}`;
    const storedData = localStorage.getItem(streakKey);
    
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        setUnlocked(data.currentStreak >= 7);
      } catch (error) {
        console.error('Failed to parse streak data', error);
      }
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  const handleLevelSelection = (level: UserLevel) => {
    updateUserLevel(level);
    setShowLevelDialog(false);
  };

  const topics = [
    { 
      title: 'Arrays & Strings', 
      progress: 40,
      icon: <Code className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-800'
    },
    { 
      title: 'Linked Lists', 
      progress: 25,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-green-100 text-green-800'
    },
    { 
      title: 'Trees & Graphs', 
      progress: 10,
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-800'
    },
    { 
      title: 'Dynamic Programming', 
      progress: 5,
      icon: <BarChart2 className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-800'
    },
  ];

  const recommended = [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stacks' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked Lists' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming' },
  ];

  const hubLinks = [
    { 
      title: 'Algorithms', 
      description: 'Learn common algorithms and their implementation',
      icon: <BookMarked className="h-10 w-10 text-slate-700" />,
      path: '/algorithms',
      color: 'bg-blue-50 border-blue-200'
    },
    { 
      title: 'Data Structures', 
      description: 'Master fundamental data structures',
      icon: <LayoutList className="h-10 w-10 text-slate-700" />,
      path: '/data-structures',
      color: 'bg-green-50 border-green-200'
    },
    { 
      title: 'Practice', 
      description: 'Solve coding problems and challenges',
      icon: <PenTool className="h-10 w-10 text-slate-700" />,
      path: '/practice',
      color: 'bg-yellow-50 border-yellow-200'
    },
    { 
      title: 'DSA Assistant', 
      description: 'Get help with your DSA questions',
      icon: <MessageCircle className="h-10 w-10 text-slate-700" />,
      path: '/assistant',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Welcome back, {user?.username}</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-medium">
                {user?.level ? (
                  <>You're currently at <span className="font-semibold text-purple-600 dark:text-purple-400">{user.level}</span> level</>
                ) : (
                  <>Complete your profile by selecting your skill level</>
                )}
              </p>
            </header>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {hubLinks.map((link, i) => (
              <FadeIn key={link.title} delay={i * 100}>
                <Link to={link.path}>
                  <Card className={`h-full transition-all hover:shadow-lg hover:scale-[1.02] ${link.color} border-2`}>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full p-3 mb-4 bg-white/80">
                        {link.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-slate-800">{link.title}</h3>
                      <p className="text-sm text-slate-600 font-medium">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FadeIn delay={100} className="md:col-span-2">
              <Card className="border-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-900 dark:text-slate-100">Your Progress</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topics.map((topic, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${topic.color} font-semibold`}>
                          {topic.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{topic.title}</span>
                            <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{topic.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                            <div 
                              className="bg-purple-600 h-2.5 rounded-full" 
                              style={{ width: `${topic.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <StreakTracker />
            </FadeIn>
          </div>

          <FadeIn delay={250}>
            <CompanyProblems 
              problems={companyProblems} 
              unlocked={unlocked} 
            />
          </FadeIn>

          <FadeIn delay={300} className="mt-8">
            <Card className="border-2">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-slate-900 dark:text-slate-100">Recommended Problems</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 font-medium">Based on your progress and interests</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild className="border-2 font-semibold">
                    <Link to="/practice">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommended.map((problem, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer border-2 border-slate-200 dark:border-slate-600">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-800 dark:text-slate-200">{problem.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                          problem.difficulty === 'Easy' ? 'bg-green-200 text-green-800' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{problem.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>

      <UserLevelSelection 
        open={showLevelDialog} 
        onSelect={handleLevelSelection} 
      />
    </>
  );
};

export default Dashboard;
