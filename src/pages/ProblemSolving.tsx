import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, PlayCircle, Check, Code, FileText, Lightbulb } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface TestCase {
  input: string;
  expectedOutput: string;
  result?: 'pending' | 'passed' | 'failed';
  actualOutput?: string;
}

const ProblemSolving: React.FC = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [runningCode, setRunningCode] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [allTestsPassed, setAllTestsPassed] = useState(false);

  useEffect(() => {
    // Simulate fetching problem data
    const fetchProblemData = () => {
      setLoading(true);
      setTimeout(() => {
        // Mock problem data
        const mockProblems = {
          '1': {
            id: 1,
            title: 'Two Sum',
            difficulty: 'Easy',
            category: 'Arrays',
            description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
            examples: [
              {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
              },
              {
                input: 'nums = [3,2,4], target = 6',
                output: '[1,2]',
                explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
              }
            ],
            constraints: [
              '2 <= nums.length <= 10^4',
              '-10^9 <= nums[i] <= 10^9',
              '-10^9 <= target <= 10^9',
              'Only one valid answer exists.'
            ],
            testCases: [
              {
                input: '[2,7,11,15]\n9',
                expectedOutput: '[0,1]',
                result: 'pending' as const,
              },
              {
                input: '[3,2,4]\n6',
                expectedOutput: '[1,2]',
                result: 'pending' as const,
              },
              {
                input: '[3,3]\n6',
                expectedOutput: '[0,1]',
                result: 'pending' as const,
              }
            ],
            starterCode: `function twoSum(nums, target) {
  // Write your code here
    
  return [];
};`,
            solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
};`
          },
          '5': {
            id: 5,
            title: 'Maximum Subarray',
            difficulty: 'Medium',
            category: 'Arrays',
            description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
            examples: [
              {
                input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                output: '6',
                explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
              },
              {
                input: 'nums = [1]',
                output: '1',
                explanation: 'The subarray [1] has the largest sum 1.'
              }
            ],
            constraints: [
              '1 <= nums.length <= 10^5',
              '-10^4 <= nums[i] <= 10^4'
            ],
            testCases: [
              {
                input: '[-2,1,-3,4,-1,2,1,-5,4]',
                expectedOutput: '6',
                result: 'pending' as const,
              },
              {
                input: '[1]',
                expectedOutput: '1',
                result: 'pending' as const,
              },
              {
                input: '[5,4,-1,7,8]',
                expectedOutput: '23',
                result: 'pending' as const,
              }
            ],
            starterCode: `function maxSubArray(nums) {
  // Write your code here
    
  return 0;
};`,
            solution: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
};`
          }
        };

        const problemData = mockProblems[problemId as keyof typeof mockProblems];
        
        if (problemData) {
          setProblem(problemData);
          setTestCases(problemData.testCases as TestCase[]);
          setCode(problemData.starterCode);
        } else {
          // If problem not found, create a default one
          setProblem({
            id: problemId,
            title: 'Problem Not Found',
            difficulty: 'Unknown',
            category: 'Unknown',
            description: 'The requested problem could not be found.',
            examples: [],
            constraints: [],
            testCases: [],
            starterCode: '// Write your code here',
            solution: ''
          });
          setTestCases([]);
          setCode('// Write your code here');
        }
        
        setLoading(false);
      }, 800);
    };

    fetchProblemData();
  }, [problemId]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleBack = () => {
    navigate('/practice');
  };

  const resetTestCases = () => {
    setTestCases(testCases.map(tc => ({
      ...tc,
      result: 'pending',
      actualOutput: undefined
    })));
    setAllTestsPassed(false);
  };

  const runCode = () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please write some code before running.",
        variant: "destructive",
      });
      return;
    }

    setRunningCode(true);
    resetTestCases();
    
    // Simulate code execution for each test case
    setTimeout(() => {
      try {
        // Create a function from the code
        // Note: This is unsafe in a production environment, but used here for demonstration
        const userFunc = new Function(`
          ${code}
          return {
            twoSum,
            maxSubArray
          };
        `)();
        
        const updatedTestCases = [...testCases];
        let allPassed = true;
        
        // Process each test case
        updatedTestCases.forEach((testCase, index) => {
          try {
            let funcToCall;
            let args;
            
            // Parse input based on problem type
            if (problem.title === 'Two Sum') {
              funcToCall = userFunc.twoSum;
              const lines = testCase.input.trim().split('\n');
              const numsArr = JSON.parse(lines[0]);
              const target = parseInt(lines[1]);
              args = [numsArr, target];
            } else if (problem.title === 'Maximum Subarray') {
              funcToCall = userFunc.maxSubArray;
              args = [JSON.parse(testCase.input)];
            } else {
              throw new Error('Unknown problem type');
            }
            
            // Call the user's function
            const result = funcToCall(...args);
            const actualOutput = JSON.stringify(result);
            
            // Check if result matches expected output
            if (actualOutput === testCase.expectedOutput) {
              updatedTestCases[index].result = 'passed';
              updatedTestCases[index].actualOutput = actualOutput;
            } else {
              updatedTestCases[index].result = 'failed';
              updatedTestCases[index].actualOutput = actualOutput;
              allPassed = false;
            }
          } catch (error) {
            updatedTestCases[index].result = 'failed';
            updatedTestCases[index].actualOutput = `Error: ${(error as Error).message}`;
            allPassed = false;
          }
        });
        
        setTestCases(updatedTestCases);
        setAllTestsPassed(allPassed);
        
        if (allPassed) {
          toast({
            title: "Success",
            description: "All test cases passed!",
          });
        } else {
          toast({
            title: "Some tests failed",
            description: "Check the test cases for details.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Compilation Error",
          description: (error as Error).message,
          variant: "destructive",
        });
      }
      
      setRunningCode(false);
    }, 1000);
  };

  const submitSolution = () => {
    if (!allTestsPassed) {
      toast({
        title: "Cannot Submit",
        description: "You need to pass all test cases before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Solution Submitted",
      description: "Congratulations! Your solution has been submitted successfully.",
    });
    
    // In a real app, you would save the submission to a database
    setTimeout(() => navigate('/practice'), 2000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-background">
          <div className="container px-4 py-8 mx-auto">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading problem...</p>
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
              <ArrowLeft className="h-4 w-4" /> Back to Problems
            </Button>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <CardTitle className="text-2xl">{problem.title}</CardTitle>
                        <CardDescription className="mt-1">{problem.category}</CardDescription>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${
                        problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="description">
                      <TabsList className="w-full">
                        <TabsTrigger value="description" className="flex-1">
                          Description
                        </TabsTrigger>
                        <TabsTrigger value="examples" className="flex-1">
                          Examples
                        </TabsTrigger>
                        <TabsTrigger value="hints" className="flex-1">
                          Hints
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="description" className="mt-4 space-y-4">
                        <div className="whitespace-pre-line">{problem.description}</div>
                        
                        {problem.constraints && problem.constraints.length > 0 && (
                          <div className="mt-4">
                            <h3 className="font-medium mb-2">Constraints:</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              {problem.constraints.map((constraint: string, i: number) => (
                                <li key={i} className="text-sm">{constraint}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="examples" className="mt-4">
                        {problem.examples && problem.examples.length > 0 ? (
                          <div className="space-y-4">
                            {problem.examples.map((example: any, i: number) => (
                              <div key={i} className="p-3 border rounded-md">
                                <div className="grid grid-cols-1 gap-2">
                                  <div>
                                    <div className="text-sm font-medium">Input:</div>
                                    <pre className="bg-secondary/30 p-2 rounded text-sm overflow-x-auto">
                                      {example.input}
                                    </pre>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Output:</div>
                                    <pre className="bg-secondary/30 p-2 rounded text-sm overflow-x-auto">
                                      {example.output}
                                    </pre>
                                  </div>
                                  {example.explanation && (
                                    <div>
                                      <div className="text-sm font-medium">Explanation:</div>
                                      <div className="text-sm text-muted-foreground">
                                        {example.explanation}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No examples available.</p>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="hints" className="mt-4">
                        <div className="p-4 bg-secondary/30 rounded-md flex gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm">Think about how you can use a hash map to efficiently find complement values.</p>
                            <Button variant="link" className="p-0 h-auto text-xs mt-1">
                              Show more hints
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {testCases.map((testCase, i) => (
                        <div key={i} className="border rounded-md overflow-hidden">
                          <div className="flex items-center justify-between bg-secondary/30 px-3 py-2">
                            <div className="font-medium">Test Case {i + 1}</div>
                            {testCase.result !== 'pending' && (
                              <div className={`text-xs px-2 py-1 rounded-full ${
                                testCase.result === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {testCase.result === 'passed' ? 'Passed' : 'Failed'}
                              </div>
                            )}
                          </div>
                          <div className="p-3 space-y-2">
                            <div>
                              <div className="text-xs font-medium">Input:</div>
                              <pre className="bg-secondary/30 p-2 rounded text-xs overflow-x-auto">
                                {testCase.input}
                              </pre>
                            </div>
                            <div>
                              <div className="text-xs font-medium">Expected Output:</div>
                              <pre className="bg-secondary/30 p-2 rounded text-xs overflow-x-auto">
                                {testCase.expectedOutput}
                              </pre>
                            </div>
                            {testCase.result !== 'pending' && (
                              <div>
                                <div className="text-xs font-medium">Your Output:</div>
                                <pre className={`p-2 rounded text-xs overflow-x-auto ${
                                  testCase.result === 'passed' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                  {testCase.actualOutput}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Code Editor
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        onClick={runCode}
                        disabled={runningCode}
                        className="gap-1"
                        variant="secondary"
                      >
                        <PlayCircle className="h-4 w-4" />
                        Run
                      </Button>
                      <Button 
                        onClick={submitSolution}
                        disabled={!allTestsPassed}
                        className="gap-1"
                      >
                        <Check className="h-4 w-4" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow pb-6">
                  <div className="h-full">
                    <Textarea 
                      className="h-[calc(100vh-400px)] min-h-[400px] font-mono text-sm" 
                      value={code} 
                      onChange={handleCodeChange}
                    />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProblemSolving;
