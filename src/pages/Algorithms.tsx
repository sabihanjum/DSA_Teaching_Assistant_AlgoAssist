
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { Search, ArrowRight, CheckCircle, Star } from 'lucide-react';

const Algorithms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const algorithmCategories = [
    {
      id: 'sorting',
      name: 'Sorting Algorithms',
      description: 'Methods for organizing elements in a specific order',
      algorithms: [
        { 
          name: 'Bubble Sort', 
          difficulty: 'Easy',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          completed: true
        },
        { 
          name: 'Selection Sort', 
          difficulty: 'Easy',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          completed: true
        },
        { 
          name: 'Insertion Sort', 
          difficulty: 'Easy',
          timeComplexity: 'O(n²)',
          spaceComplexity: 'O(1)',
          completed: false
        },
        { 
          name: 'Merge Sort', 
          difficulty: 'Medium',
          timeComplexity: 'O(n log n)',
          spaceComplexity: 'O(n)',
          completed: false
        },
        { 
          name: 'Quick Sort', 
          difficulty: 'Medium',
          timeComplexity: 'O(n log n)',
          spaceComplexity: 'O(log n)',
          completed: false
        },
        { 
          name: 'Heap Sort', 
          difficulty: 'Medium',
          timeComplexity: 'O(n log n)',
          spaceComplexity: 'O(1)',
          completed: false
        },
      ]
    },
    {
      id: 'searching',
      name: 'Searching Algorithms',
      description: 'Techniques to find an element within a data structure',
      algorithms: [
        { 
          name: 'Linear Search', 
          difficulty: 'Easy',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(1)',
          completed: true
        },
        { 
          name: 'Binary Search', 
          difficulty: 'Easy',
          timeComplexity: 'O(log n)',
          spaceComplexity: 'O(1)',
          completed: false
        },
        { 
          name: 'Breadth-First Search', 
          difficulty: 'Medium',
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)',
          completed: false
        },
        { 
          name: 'Depth-First Search', 
          difficulty: 'Medium',
          timeComplexity: 'O(V + E)',
          spaceComplexity: 'O(V)',
          completed: false
        },
      ]
    },
    {
      id: 'graph',
      name: 'Graph Algorithms',
      description: 'Algorithms that operate on graph data structures',
      algorithms: [
        { 
          name: 'Dijkstra\'s Algorithm', 
          difficulty: 'Medium',
          timeComplexity: 'O(V² + E)',
          spaceComplexity: 'O(V)',
          completed: false
        },
        { 
          name: 'Bellman-Ford Algorithm', 
          difficulty: 'Hard',
          timeComplexity: 'O(V × E)',
          spaceComplexity: 'O(V)',
          completed: false
        },
        { 
          name: 'Kruskal\'s Algorithm', 
          difficulty: 'Medium',
          timeComplexity: 'O(E log E)',
          spaceComplexity: 'O(V + E)',
          completed: false
        },
        { 
          name: 'Prim\'s Algorithm', 
          difficulty: 'Medium',
          timeComplexity: 'O(V² + E)',
          spaceComplexity: 'O(V + E)',
          completed: false
        },
      ]
    },
    {
      id: 'dynamic',
      name: 'Dynamic Programming',
      description: 'Breaking down problems into simpler subproblems',
      algorithms: [
        { 
          name: 'Fibonacci Sequence', 
          difficulty: 'Easy',
          timeComplexity: 'O(n)',
          spaceComplexity: 'O(n)',
          completed: false
        },
        { 
          name: 'Knapsack Problem', 
          difficulty: 'Medium',
          timeComplexity: 'O(n × W)',
          spaceComplexity: 'O(n × W)',
          completed: false
        },
        { 
          name: 'Longest Common Subsequence', 
          difficulty: 'Medium',
          timeComplexity: 'O(m × n)',
          spaceComplexity: 'O(m × n)',
          completed: false
        },
        { 
          name: 'Matrix Chain Multiplication', 
          difficulty: 'Hard',
          timeComplexity: 'O(n³)',
          spaceComplexity: 'O(n²)',
          completed: false
        },
      ]
    },
  ];

  const filteredCategories = algorithmCategories.map(category => ({
    ...category,
    algorithms: category.algorithms.filter(
      algo => algo.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.algorithms.length > 0);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Algorithms</h1>
              <p className="text-muted-foreground mt-1">Learn essential algorithms and their implementations</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mb-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search algorithms..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue={algorithmCategories[0].id} className="space-y-6">
              <TabsList className="w-full justify-start overflow-x-auto">
                {algorithmCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {algorithmCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(searchQuery ? filteredCategories.find(c => c.id === category.id)?.algorithms : category.algorithms)?.map((algorithm, i) => (
                          <Card key={i} className="overflow-hidden hover:shadow-md transition-all">
                            <CardContent className="p-0">
                              <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center space-x-2">
                                  {algorithm.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                  <h3 className="font-medium">{algorithm.name}</h3>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  algorithm.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                  algorithm.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {algorithm.difficulty}
                                </span>
                              </div>
                              <div className="p-4 text-sm">
                                <div className="flex justify-between mb-1">
                                  <span className="text-muted-foreground">Time:</span>
                                  <span className="font-mono">{algorithm.timeComplexity}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Space:</span>
                                  <span className="font-mono">{algorithm.spaceComplexity}</span>
                                </div>
                              </div>
                              <div className="bg-muted p-3 flex justify-end">
                                <Button variant="ghost" size="sm" className="gap-1">
                                  Learn <ArrowRight className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default Algorithms;
