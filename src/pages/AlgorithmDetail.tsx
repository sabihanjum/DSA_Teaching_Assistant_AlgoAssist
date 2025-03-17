
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code, BookOpen, PlayCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const AlgorithmDetail: React.FC = () => {
  const { algorithmName } = useParams();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchAlgorithmData = () => {
      setLoading(true);
      // This would be an API call in a real application
      setTimeout(() => {
        // Mock data based on the algorithm name
        const mockData = {
          bubbleSort: {
            name: 'Bubble Sort',
            category: 'Sorting Algorithms',
            difficulty: 'Easy',
            timeComplexity: 'O(n²)',
            spaceComplexity: 'O(1)',
            description: 'Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
            pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
            implementation: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                input: '[5, 3, 8, 4, 2]',
                steps: [
                  '[5, 3, 8, 4, 2] - Initial array',
                  '[3, 5, 8, 4, 2] - Swap 5 and 3',
                  '[3, 5, 4, 8, 2] - Swap 8 and 4',
                  '[3, 5, 4, 2, 8] - Swap 8 and 2',
                  '[3, 4, 5, 2, 8] - Swap 5 and 4',
                  '[3, 4, 2, 5, 8] - Swap 5 and 2',
                  '[3, 2, 4, 5, 8] - Swap 4 and 2',
                  '[2, 3, 4, 5, 8] - Swap 3 and 2',
                  '[2, 3, 4, 5, 8] - Final sorted array'
                ]
              }
            ],
            practiceProblems: [
              { id: 1, title: 'Sort an Array', difficulty: 'Easy' },
              { id: 2, title: 'Sort Colors', difficulty: 'Medium' }
            ]
          },
          // Add more algorithm mock data here
          mergeSort: {
            name: 'Merge Sort',
            category: 'Sorting Algorithms',
            difficulty: 'Medium',
            timeComplexity: 'O(n log n)',
            spaceComplexity: 'O(n)',
            description: 'Merge sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
            pseudocode: `procedure mergeSort(A : list of sortable items)
    if length(A) <= 1 then
        return A
    end if
    
    middle = length(A) / 2
    left = mergeSort(A[0...middle-1])
    right = mergeSort(A[middle...length(A)-1])
    
    return merge(left, right)
end procedure

procedure merge(left, right : list of sortable items)
    result = []
    while length(left) > 0 and length(right) > 0 do
        if left[0] <= right[0] then
            append left[0] to result
            left = left[1...length(left)-1]
        else
            append right[0] to result
            right = right[1...length(right)-1]
        end if
    end while
    
    if length(left) > 0 then
        append left to result
    end if
    
    if length(right) > 0 then
        append right to result
    end if
    
    return result
end procedure`,
            implementation: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                input: '[38, 27, 43, 3, 9, 82, 10]',
                steps: [
                  'Split [38, 27, 43, 3, 9, 82, 10] into [38, 27, 43, 3] and [9, 82, 10]',
                  'Split [38, 27, 43, 3] into [38, 27] and [43, 3]',
                  'Split [38, 27] into [38] and [27]',
                  'Merge [38] and [27] to get [27, 38]',
                  'Split [43, 3] into [43] and [3]',
                  'Merge [43] and [3] to get [3, 43]',
                  'Merge [27, 38] and [3, 43] to get [3, 27, 38, 43]',
                  'Split [9, 82, 10] into [9] and [82, 10]',
                  'Split [82, 10] into [82] and [10]',
                  'Merge [82] and [10] to get [10, 82]',
                  'Merge [9] and [10, 82] to get [9, 10, 82]',
                  'Merge [3, 27, 38, 43] and [9, 10, 82] to get [3, 9, 10, 27, 38, 43, 82]'
                ]
              }
            ],
            practiceProblems: [
              { id: 3, title: 'Sort an Array', difficulty: 'Medium' },
              { id: 4, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard' }
            ]
          },
          binarySearch: {
            name: 'Binary Search',
            category: 'Searching Algorithms',
            difficulty: 'Easy',
            timeComplexity: 'O(log n)',
            spaceComplexity: 'O(1)',
            description: 'Binary search is a search algorithm that finds the position of a target value within a sorted array. It works by repeatedly dividing the search interval in half.',
            pseudocode: `procedure binarySearch(A, target)
    left = 0
    right = length(A) - 1
    
    while left <= right do
        mid = floor((left + right) / 2)
        
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            left = mid + 1
        else
            right = mid - 1
        end if
    end while
    
    return -1  // Target not found
end procedure`,
            implementation: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found the target
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Target is in the right half
    } else {
      right = mid - 1; // Target is in the left half
    }
  }
  
  return -1; // Target not found
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                input: 'Array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Target: 7',
                steps: [
                  'left = 0, right = 9, mid = 4, arr[mid] = 5 < 7, so left = mid + 1 = 5',
                  'left = 5, right = 9, mid = 7, arr[mid] = 8 > 7, so right = mid - 1 = 6',
                  'left = 5, right = 6, mid = 5, arr[mid] = 6 < 7, so left = mid + 1 = 6',
                  'left = 6, right = 6, mid = 6, arr[mid] = 7 == 7, return mid = 6'
                ]
              }
            ],
            practiceProblems: [
              { id: 5, title: 'Binary Search', difficulty: 'Easy' },
              { id: 6, title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium' }
            ]
          }
        };

        // Convert algorithm name to camelCase for lookup
        const camelCaseName = algorithmName?.toLowerCase().replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');

        setAlgorithm(mockData[camelCaseName as keyof typeof mockData] || {
          name: algorithmName,
          description: 'Algorithm details not found.',
          category: 'Unknown',
          difficulty: 'Unknown',
          timeComplexity: 'Unknown',
          spaceComplexity: 'Unknown',
          pseudocode: 'Not available',
          implementation: 'Not available',
          visualization: 'Not available',
          examples: [],
          practiceProblems: []
        });
        setLoading(false);
      }, 500);
    };

    fetchAlgorithmData();
  }, [algorithmName]);

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
        <main className="pt-20 min-h-screen bg-background">
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
      <main className="pt-20 min-h-screen bg-background">
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
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Understanding how {algorithm.name} works</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{algorithm.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <p className="font-medium mb-1">Time Complexity</p>
                    <p className="font-mono">{algorithm.timeComplexity}</p>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-md">
                    <p className="font-medium mb-1">Space Complexity</p>
                    <p className="font-mono">{algorithm.spaceComplexity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue="code" className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="code" className="gap-2">
                  <Code className="h-4 w-4" /> Implementation
                </TabsTrigger>
                <TabsTrigger value="pseudocode" className="gap-2">
                  <BookOpen className="h-4 w-4" /> Pseudocode
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <PlayCircle className="h-4 w-4" /> Examples
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto">
                      <code>{algorithm.implementation}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pseudocode" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto">
                      <code>{algorithm.pseudocode}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {algorithm.examples && algorithm.examples.length > 0 ? (
                      algorithm.examples.map((example: any, i: number) => (
                        <div key={i} className="mb-6 last:mb-0">
                          <h3 className="font-medium mb-2">Example {i + 1}</h3>
                          <p className="mb-2 font-mono bg-secondary/30 p-2 rounded">{example.input}</p>
                          <h4 className="text-sm font-medium mb-1 text-muted-foreground">Steps:</h4>
                          <ol className="list-decimal pl-5 space-y-1">
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
            </Tabs>
          </FadeIn>

          <FadeIn delay={300}>
            <Card>
              <CardHeader>
                <CardTitle>Practice Problems</CardTitle>
                <CardDescription>Apply what you've learned</CardDescription>
              </CardHeader>
              <CardContent>
                {algorithm.practiceProblems && algorithm.practiceProblems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {algorithm.practiceProblems.map((problem: any) => (
                      <Card key={problem.id} className="overflow-hidden hover:shadow-md transition-all">
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
