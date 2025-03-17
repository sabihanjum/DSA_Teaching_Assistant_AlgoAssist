
import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import FadeIn from '@/components/animations/FadeIn';
import UserLevelSelection, { UserLevel } from '@/components/UserLevelSelection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, BookOpen, Code, Clock, BookMarked, MessageCircle, PenTool, LayoutList } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, updateUserLevel } = useAuth();
  const [showLevelDialog, setShowLevelDialog] = useState(false);

  useEffect(() => {
    // Check if it's first login and user doesn't have a level yet
    if (user?.isFirstLogin && !user?.level) {
      setShowLevelDialog(true);
    }
  }, [user]);

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
      color: 'bg-blue-100 text-blue-700'
    },
    { 
      title: 'Linked Lists', 
      progress: 25,
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-green-100 text-green-700'
    },
    { 
      title: 'Trees & Graphs', 
      progress: 10,
      icon: <Clock className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-700'
    },
    { 
      title: 'Dynamic Programming', 
      progress: 5,
      icon: <BarChart2 className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-700'
    },
  ];

  const recommended = [
    { title: 'Two Sum', difficulty: 'Easy', category: 'Arrays' },
    { title: 'Valid Parentheses', difficulty: 'Easy', category: 'Stacks' },
    { title: 'Merge Two Sorted Lists', difficulty: 'Easy', category: 'Linked Lists' },
    { title: 'Maximum Subarray', difficulty: 'Medium', category: 'Dynamic Programming' },
  ];

  // Hub links for main navigation
  const hubLinks = [
    { 
      title: 'Algorithms', 
      description: 'Learn common algorithms and their implementation',
      icon: <BookMarked className="h-10 w-10 text-primary/80" />,
      path: '/algorithms',
      color: 'bg-blue-50 border-blue-100'
    },
    { 
      title: 'Data Structures', 
      description: 'Master fundamental data structures',
      icon: <LayoutList className="h-10 w-10 text-primary/80" />,
      path: '/data-structures',
      color: 'bg-green-50 border-green-100'
    },
    { 
      title: 'Practice', 
      description: 'Solve coding problems and challenges',
      icon: <PenTool className="h-10 w-10 text-primary/80" />,
      path: '/practice',
      color: 'bg-yellow-50 border-yellow-100'
    },
    { 
      title: 'DSA Assistant', 
      description: 'Get help with your DSA questions',
      icon: <MessageCircle className="h-10 w-10 text-primary/80" />,
      path: '/assistant',
      color: 'bg-purple-50 border-purple-100'
    }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Welcome back, {user?.username}</h1>
              <p className="text-muted-foreground mt-1">
                {user?.level ? (
                  <>You're currently at <span className="font-medium text-primary">{user.level}</span> level</>
                ) : (
                  <>Complete your profile by selecting your skill level</>
                )}
              </p>
            </header>
          </FadeIn>

          {/* Hub cards for main navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {hubLinks.map((link, i) => (
              <FadeIn key={link.title} delay={i * 100}>
                <Link to={link.path}>
                  <Card className={`h-full transition-all hover:shadow-md hover:scale-[1.02] ${link.color}`}>
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="rounded-full p-3 mb-4">
                        {link.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                      <p className="text-sm text-muted-foreground">{link.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FadeIn delay={100} className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topics.map((topic, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${topic.color}`}>
                          {topic.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{topic.title}</span>
                            <span className="text-sm text-muted-foreground">{topic.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
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
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Your learning achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Problems Solved</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">4</div>
                      <div className="text-sm text-muted-foreground">Topics Studied</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-sm text-muted-foreground">Days Streak</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold">5h</div>
                      <div className="text-sm text-muted-foreground">Study Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recommended Problems</CardTitle>
                    <CardDescription>Based on your progress and interests</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/practice">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommended.map((problem, i) => (
                    <div key={i} className="bg-secondary/30 rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{problem.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{problem.category}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>

      {/* Level Selection Dialog */}
      <UserLevelSelection 
        open={showLevelDialog} 
        onSelect={handleLevelSelection} 
      />
    </>
  );
};

export default Dashboard;
