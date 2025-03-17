
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FadeIn from '@/components/animations/FadeIn';
import { Search, ExternalLink, Code, BookOpen, BarChart, Filter } from 'lucide-react';

const Practice: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const navigate = useNavigate();

  const platformLinks = [
    {
      name: 'LeetCode',
      url: 'https://leetcode.com',
      description: 'Practice coding problems, prepare for interviews',
      icon: <Code className="h-5 w-5" />
    },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com',
      description: 'Coding challenges and competitive programming',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      name: 'CodeSignal',
      url: 'https://codesignal.com',
      description: 'Skill assessments and coding challenges',
      icon: <BarChart className="h-5 w-5" />
    }
  ];

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Arrays',
      description: 'Find two numbers that add up to a specific target'
    },
    {
      id: 2,
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      category: 'Linked Lists',
      description: 'Reverse a singly linked list'
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stacks',
      description: 'Determine if the input string has valid parentheses'
    },
    {
      id: 4,
      title: 'Merge Two Sorted Lists',
      difficulty: 'Easy',
      category: 'Linked Lists',
      description: 'Merge two sorted linked lists into one sorted list'
    },
    {
      id: 5,
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      category: 'Arrays',
      description: 'Find the contiguous subarray with the largest sum'
    },
    {
      id: 6,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      category: 'Arrays',
      description: 'Merge all overlapping intervals'
    },
    {
      id: 7,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      category: 'Trees',
      description: 'Return level-order traversal of binary tree nodes'
    },
    {
      id: 8,
      title: 'Word Break',
      difficulty: 'Medium',
      category: 'Dynamic Programming',
      description: 'Determine if string can be segmented into dictionary words'
    },
    {
      id: 9,
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      category: 'Arrays',
      description: 'Calculate how much water can be trapped after raining'
    },
    {
      id: 10,
      title: 'Median of Two Sorted Arrays',
      difficulty: 'Hard',
      category: 'Arrays',
      description: 'Find the median of two sorted arrays'
    },
    {
      id: 11,
      title: 'LRU Cache',
      difficulty: 'Hard',
      category: 'Design',
      description: 'Design a data structure that implements Least Recently Used cache'
    },
    {
      id: 12,
      title: 'Serialize and Deserialize Binary Tree',
      difficulty: 'Hard',
      category: 'Trees',
      description: 'Design algorithm to serialize and deserialize binary tree'
    },
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesCategory = categoryFilter === 'all' || problem.category.toLowerCase() === categoryFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = [...new Set(problems.map(p => p.category))].sort();

  const handleSolveProblem = (problemId: number) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Practice Problems</h1>
              <p className="text-muted-foreground mt-1">Solve coding challenges to improve your DSA skills</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <Tabs defaultValue="problems" className="space-y-6">
              <TabsList className="mb-4">
                <TabsTrigger value="problems">Practice Problems</TabsTrigger>
                <TabsTrigger value="platforms">External Platforms</TabsTrigger>
              </TabsList>

              <TabsContent value="problems">
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search problems..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-[150px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map((problem) => (
                      <Card key={problem.id} className="hover:shadow-md transition-all">
                        <CardContent className="p-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                            <div className="mb-2 sm:mb-0">
                              <h3 className="text-lg font-medium">{problem.title}</h3>
                              <p className="text-sm text-muted-foreground">{problem.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-muted-foreground">{problem.category}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {problem.difficulty}
                              </span>
                              <Button onClick={() => handleSolveProblem(problem.id)}>Solve</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <p className="text-muted-foreground">No problems match your search criteria.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="platforms">
                <Card>
                  <CardHeader>
                    <CardTitle>External Coding Platforms</CardTitle>
                    <CardDescription>Practice on these popular platforms to enhance your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {platformLinks.map((platform, i) => (
                        <a 
                          key={i} 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="no-underline"
                        >
                          <Card className="h-full hover:shadow-md transition-all">
                            <CardContent className="flex flex-col items-center text-center p-6">
                              <div className="rounded-full bg-primary/10 p-3 mb-4">
                                {platform.icon}
                              </div>
                              <h3 className="text-xl font-medium mb-2 flex items-center gap-2">
                                {platform.name}
                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                              </h3>
                              <p className="text-sm text-muted-foreground">{platform.description}</p>
                            </CardContent>
                          </Card>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default Practice;
