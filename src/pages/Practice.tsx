
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import { Search, ExternalLink, ArrowUpRight } from 'lucide-react';

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const problems = [
    {
      id: 1,
      title: 'Two Sum',
      difficulty: 'Easy',
      category: 'Arrays',
      companies: ['Google', 'Amazon', 'Microsoft'],
      solution: true
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      category: 'Stacks',
      companies: ['Amazon', 'Facebook'],
      solution: true
    },
    {
      id: 5,
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      category: 'Arrays',
      companies: ['Google', 'Microsoft'],
      solution: false
    },
    {
      id: 8,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      category: 'Arrays',
      companies: ['Google', 'Facebook', 'Microsoft'],
      solution: false
    },
    {
      id: 12,
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      category: 'Dynamic Programming',
      companies: ['Amazon', 'Google', 'Apple'],
      solution: false
    }
  ];

  const externalResources = [
    {
      name: 'LeetCode',
      description: 'Popular platform for coding interview preparation',
      url: 'https://leetcode.com/'
    },
    {
      name: 'HackerRank',
      description: 'Practice coding challenges and assessments',
      url: 'https://www.hackerrank.com/'
    },
    {
      name: 'CodeSignal',
      description: 'Coding assessments and interview practice',
      url: 'https://codesignal.com/'
    }
  ];

  const filteredProblems = problems.filter(problem => 
    problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    problem.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProblemClick = (problemId: number) => {
    navigate(`/practice/${problemId}`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Practice Problems</h1>
              <p className="text-muted-foreground mt-1">
                Solve coding challenges and improve your problem-solving skills
              </p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mb-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search problems by name or category..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FadeIn delay={200}>
                <Tabs defaultValue="all" className="space-y-6">
                  <TabsList>
                    <TabsTrigger value="all">All Problems</TabsTrigger>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>

                  {['all', 'easy', 'medium', 'hard'].map(difficulty => (
                    <TabsContent key={difficulty} value={difficulty} className="space-y-4">
                      {filteredProblems
                        .filter(p => difficulty === 'all' || p.difficulty.toLowerCase() === difficulty)
                        .map(problem => (
                          <Card key={problem.id} className="hover:shadow-sm transition-all">
                            <CardContent className="p-0">
                              <div className="p-4 flex justify-between items-center">
                                <div>
                                  <h3 className="font-medium mb-1">{problem.title}</h3>
                                  <div className="flex flex-wrap gap-2 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                      {problem.difficulty}
                                    </span>
                                    <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                                      {problem.category}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {problem.companies.map((company, i) => (
                                      <Badge key={i} variant="outline" className="text-xs border-indigo-100">
                                        {company}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Button 
                                  variant="secondary" 
                                  onClick={() => handleProblemClick(problem.id)}
                                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
                                >
                                  Solve
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={300}>
                <Card>
                  <CardHeader>
                    <CardTitle>External Resources</CardTitle>
                    <CardDescription>
                      Practice on other popular platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {externalResources.map((resource, i) => (
                      <a 
                        key={i} 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block p-3 border rounded-md hover:bg-indigo-50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium flex items-center gap-1">
                              {resource.name}
                              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                            </h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Practice;
