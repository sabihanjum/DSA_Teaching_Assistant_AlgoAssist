import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code, BookOpen, PlayCircle, Activity } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import AlgorithmVisualizer from '@/components/visualizations/AlgorithmVisualizer';

const AlgorithmDetail: React.FC = () => {
  const { algorithmSlug } = useParams();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlgorithmData = () => {
      setLoading(true);
      setTimeout(() => {
        const mockData = {
          'bubble-sort': {
            name: 'Bubble Sort',
            category: 'Sorting Algorithms',
            difficulty: 'Easy',
            description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
            timeComplexity: {
              best: 'O(n)',
              average: 'O(n²)',
              worst: 'O(n²)'
            },
            spaceComplexity: 'O(1)',
            implementation: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
  }
  
  return arr;
}`,
            examples: [
              {
                input: '[5, 3, 8, 4, 2]',
                steps: [
                  'Pass 1: [3, 5, 4, 2, 8] - Largest element (8) bubbles to the end',
                  'Pass 2: [3, 4, 2, 5, 8] - Second largest (5) bubbles to position',
                  'Pass 3: [3, 2, 4, 5, 8] - Continue with remaining elements',
                  'Pass 4: [2, 3, 4, 5, 8] - Final sorted array'
                ]
              }
            ],
            practiceProblems: [
              { id: 1, title: 'Implement Bubble Sort', difficulty: 'Easy' },
              { id: 5, title: 'Sort Colors', difficulty: 'Medium' }
            ],
            applications: [
              'Educational purposes to understand sorting algorithms',
              'Efficient for very small data sets',
              'Useful when array is nearly sorted',
              'When simplicity is more important than efficiency'
            ]
          },
          'binary-search': {
            name: 'Binary Search',
            category: 'Searching Algorithms',
            difficulty: 'Easy',
            description: 'Binary search is an efficient algorithm for finding an item from a sorted array of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you\'ve narrowed down the possible locations to just one.',
            timeComplexity: {
              best: 'O(1)',
              average: 'O(log n)',
              worst: 'O(log n)'
            },
            spaceComplexity: 'O(1) iterative, O(log n) recursive',
            implementation: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
            examples: [
              {
                input: 'arr = [1, 3, 5, 7, 9, 11], target = 7',
                steps: [
                  'mid = 2, arr[2] = 5, 5 < 7, so search right half',
                  'left = 3, right = 5, mid = 4, arr[4] = 9, 9 > 7, so search left half',
                  'left = 3, right = 3, mid = 3, arr[3] = 7, found target at index 3'
                ]
              }
            ],
            practiceProblems: [
              { id: 2, title: 'Binary Search Implementation', difficulty: 'Easy' },
              { id: 6, title: 'Search in Rotated Sorted Array', difficulty: 'Medium' }
            ],
            applications: [
              'Finding an element in a sorted array',
              'Dictionary lookup',
              'Debugging with bisection method',
              'Finding insertion point in sorted array'
            ]
          }
        };

        setAlgorithm(mockData[algorithmSlug as keyof typeof mockData] || {
          name: algorithmSlug?.replace(/-/g, ' '),
          description: 'Algorithm details not found.',
          category: 'Unknown',
          difficulty: 'Unknown',
          timeComplexity: { best: 'Unknown', average: 'Unknown', worst: 'Unknown' },
          spaceComplexity: 'Unknown',
          implementation: '// Implementation not available',
          examples: [],
          practiceProblems: [],
          applications: []
        });
        setLoading(false);
      }, 500);
    };

    fetchAlgorithmData();
  }, [algorithmSlug]);

  const handleBack = () => {
    navigate('/algorithms');
  };

  const handlePracticeProblem = (problemId: number) => {
    navigate(`/practice/${problemId}`);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-primary-50">
          <div className="container px-4 py-8 mx-auto">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading algorithm details...</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-primary-50">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <Button 
              variant="ghost" 
              className="mb-6 gap-2" 
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Algorithms
            </Button>

            <header className="mb-8">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold tracking-tight">{algorithm.name}</h1>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  algorithm.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  algorithm.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {algorithm.difficulty}
                </span>
              </div>
              <p className="text-muted-foreground">{algorithm.category}</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <Card className="mb-8 border-indigo-100 shadow-sm">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Understanding the algorithm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{algorithm.description}</p>
                
                <h3 className="font-medium mb-3">Complexity Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <p className="font-medium mb-1">Best Case</p>
                    <p className="font-mono text-sm">{algorithm.timeComplexity?.best || 'N/A'}</p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <p className="font-medium mb-1">Average Case</p>
                    <p className="font-mono text-sm">{algorithm.timeComplexity?.average || 'N/A'}</p>
                  </div>
                  <div className="bg-secondary/30 p-4 rounded-md">
                    <p className="font-medium mb-1">Worst Case</p>
                    <p className="font-mono text-sm">{algorithm.timeComplexity?.worst || 'N/A'}</p>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">Space Complexity</h3>
                <div className="bg-secondary/30 p-4 rounded-md inline-block">
                  <p className="font-mono text-sm">{algorithm.spaceComplexity}</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue="visualization" className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="visualization" className="gap-2">
                  <Activity className="h-4 w-4" /> Visualization
                </TabsTrigger>
                <TabsTrigger value="implementation" className="gap-2">
                  <Code className="h-4 w-4" /> Implementation
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <PlayCircle className="h-4 w-4" /> Examples
                </TabsTrigger>
                <TabsTrigger value="applications" className="gap-2">
                  <BookOpen className="h-4 w-4" /> Applications
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="visualization" className="mt-4">
                <Card className="border-indigo-100 shadow-sm">
                  <CardContent className="pt-6">
                    <AlgorithmVisualizer algorithm={algorithm.name} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="implementation" className="mt-4">
                <Card className="border-indigo-100 shadow-sm">
                  <CardContent className="pt-6">
                    <pre className="bg-secondary/30 p-4 rounded-md overflow-x-auto">
                      <code>{algorithm.implementation}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4">
                <Card className="border-indigo-100 shadow-sm">
                  <CardContent className="pt-6">
                    {algorithm.examples && algorithm.examples.length > 0 ? (
                      algorithm.examples.map((example: any, i: number) => (
                        <div key={i} className="mb-6 last:mb-0">
                          <h3 className="font-medium mb-2">Example</h3>
                          <div className="bg-secondary/30 p-3 rounded-md mb-4">
                            <p className="font-mono text-sm">{example.input}</p>
                          </div>
                          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Steps:</h4>
                          <ol className="list-decimal pl-5 space-y-2">
                            {example.steps.map((step: string, j: number) => (
                              <li key={j} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No examples available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="applications" className="mt-4">
                <Card className="border-indigo-100 shadow-sm">
                  <CardContent className="pt-6">
                    {algorithm.applications && algorithm.applications.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {algorithm.applications.map((app: string, i: number) => (
                          <li key={i} className="text-sm">{app}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No application information available.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>

          <FadeIn delay={300}>
            <Card className="border-indigo-100 shadow-sm">
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>Apply what you've learned</CardDescription>
              </CardHeader>
              <CardContent>
                {algorithm.practiceProblems && algorithm.practiceProblems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {algorithm.practiceProblems.map((problem: any) => (
                      <Card key={problem.id} className="overflow-hidden hover:shadow-md transition-all border-indigo-50">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-4">
                            <h3 className="font-medium">{problem.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <div className="bg-muted p-3 flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handlePracticeProblem(problem.id)}
                              className="hover:bg-indigo-50"
                            >
                              Solve Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No practice problems available.</p>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default AlgorithmDetail;
