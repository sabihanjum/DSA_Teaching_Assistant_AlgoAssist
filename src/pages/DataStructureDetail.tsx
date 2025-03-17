
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Code, BookOpen, PlayCircle, Layers } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const DataStructureDetail: React.FC = () => {
  const { structureName } = useParams();
  const navigate = useNavigate();
  const [structure, setStructure] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchStructureData = () => {
      setLoading(true);
      // This would be an API call in a real application
      setTimeout(() => {
        // Mock data based on the data structure name
        const mockData = {
          arrays: {
            name: 'Arrays',
            category: 'Basic Data Structures',
            difficulty: 'Easy',
            description: 'An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.',
            operations: [
              { name: 'Access', complexity: 'O(1)', description: 'Accessing an element at a given index' },
              { name: 'Search', complexity: 'O(n)', description: 'Finding an element in an unsorted array' },
              { name: 'Insert', complexity: 'O(n)', description: 'Inserting an element at a specific position' },
              { name: 'Delete', complexity: 'O(n)', description: 'Removing an element from a specific position' }
            ],
            implementation: `// JavaScript array creation
const arr1 = [1, 2, 3, 4, 5]; // Array literal
const arr2 = new Array(5); // Array of length 5 (empty)
const arr3 = Array.from({length: 5}, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// Basic operations
const value = arr1[2]; // Access (index 2) -> 3
arr1.push(6); // Insert at end -> [1, 2, 3, 4, 5, 6]
arr1.pop(); // Remove from end -> [1, 2, 3, 4, 5]
arr1.unshift(0); // Insert at beginning -> [0, 1, 2, 3, 4, 5]
arr1.shift(); // Remove from beginning -> [1, 2, 3, 4, 5]
arr1.splice(2, 1, 'a'); // Replace at index 2 -> [1, 2, 'a', 4, 5]`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                title: 'Array Operations',
                steps: [
                  'Create array: [10, 20, 30, 40, 50]',
                  'Access third element: arr[2] = 30',
                  'Insert 35 at index 3: [10, 20, 30, 35, 40, 50]',
                  'Delete element at index 1: [10, 30, 35, 40, 50]',
                  'Search for element 40: Found at index 3'
                ]
              }
            ],
            practiceProblems: [
              { id: 1, title: 'Two Sum', difficulty: 'Easy' },
              { id: 2, title: 'Maximum Subarray', difficulty: 'Easy' },
              { id: 3, title: 'Merge Sorted Array', difficulty: 'Easy' }
            ]
          },
          linkedLists: {
            name: 'Linked Lists',
            category: 'Basic Data Structures',
            difficulty: 'Easy',
            description: 'A linked list is a linear data structure where elements are not stored at contiguous memory locations. Instead, each element (node) points to the next node.',
            operations: [
              { name: 'Access', complexity: 'O(n)', description: 'Accessing an element at a given position' },
              { name: 'Search', complexity: 'O(n)', description: 'Finding an element in the linked list' },
              { name: 'Insert', complexity: 'O(1)', description: 'Inserting an element (with known position)' },
              { name: 'Delete', complexity: 'O(1)', description: 'Removing an element (with known position)' }
            ],
            implementation: `// JavaScript linked list implementation
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a node at the end
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
  }
  
  // Add a node at the beginning
  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  
  // Get value at index
  get(index) {
    if (index < 0 || index >= this.size) return null;
    
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    
    return current.value;
  }
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                title: 'Linked List Operations',
                steps: [
                  'Create empty linked list',
                  'Append 10: 10 -> null',
                  'Append 20: 10 -> 20 -> null',
                  'Prepend 5: 5 -> 10 -> 20 -> null',
                  'Get element at index 1: 10'
                ]
              }
            ],
            practiceProblems: [
              { id: 4, title: 'Reverse Linked List', difficulty: 'Easy' },
              { id: 5, title: 'Merge Two Sorted Lists', difficulty: 'Easy' },
              { id: 6, title: 'Linked List Cycle', difficulty: 'Easy' }
            ]
          },
          binarySearchTrees: {
            name: 'Binary Search Trees',
            category: 'Trees',
            difficulty: 'Medium',
            description: 'A binary search tree is a binary tree where each node has at most two children. For each node, all elements in the left subtree are less than the node, and all elements in the right subtree are greater.',
            operations: [
              { name: 'Access', complexity: 'O(log n)', description: 'Accessing a specific element' },
              { name: 'Search', complexity: 'O(log n)', description: 'Finding an element in the tree' },
              { name: 'Insert', complexity: 'O(log n)', description: 'Adding a new element to the tree' },
              { name: 'Delete', complexity: 'O(log n)', description: 'Removing an element from the tree' }
            ],
            implementation: `// JavaScript binary search tree implementation
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  // Insert a value
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }
    
    const insertNode = (node, newNode) => {
      if (newNode.value < node.value) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    };
    
    insertNode(this.root, newNode);
  }
  
  // Search for a value
  search(value) {
    const searchNode = (node, value) => {
      if (node === null) return false;
      
      if (value === node.value) return true;
      
      if (value < node.value) {
        return searchNode(node.left, value);
      } else {
        return searchNode(node.right, value);
      }
    };
    
    return searchNode(this.root, value);
  }
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                title: 'BST Operations',
                steps: [
                  'Create empty BST',
                  'Insert 10: root = 10',
                  'Insert 5: 10 -> (5, null)',
                  'Insert 15: 10 -> (5, 15)',
                  'Insert 3: 10 -> (5 -> (3, null), 15)',
                  'Search for 5: Found',
                  'Search for 7: Not found'
                ]
              }
            ],
            practiceProblems: [
              { id: 7, title: 'Validate Binary Search Tree', difficulty: 'Medium' },
              { id: 8, title: 'Kth Smallest Element in a BST', difficulty: 'Medium' },
              { id: 9, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium' }
            ]
          },
          hashTables: {
            name: 'Hash Tables',
            category: 'Advanced Data Structures',
            difficulty: 'Medium',
            description: 'A hash table is a data structure that maps keys to values using a hash function. It provides efficient insertion, deletion, and lookup operations.',
            operations: [
              { name: 'Insert', complexity: 'O(1)', description: 'Adding a new key-value pair' },
              { name: 'Search', complexity: 'O(1)', description: 'Finding a value by key' },
              { name: 'Delete', complexity: 'O(1)', description: 'Removing a key-value pair' },
              { name: 'Collision Handling', complexity: 'O(n)', description: 'Worst case when many keys hash to the same index' }
            ],
            implementation: `// JavaScript Map (hash table implementation)
const hashTable = new Map();

// Insert key-value pairs
hashTable.set('name', 'John');
hashTable.set('age', 30);
hashTable.set('city', 'New York');

// Retrieve values
console.log(hashTable.get('name')); // 'John'

// Check if key exists
console.log(hashTable.has('age')); // true

// Delete a key-value pair
hashTable.delete('city');

// Size of the hash table
console.log(hashTable.size); // 2

// Iterate over key-value pairs
for (const [key, value] of hashTable) {
  console.log(key, value);
}`,
            visualization: 'Visualization content would go here',
            examples: [
              {
                title: 'Hash Table Operations',
                steps: [
                  'Create empty hash table',
                  'Insert ("name", "Alice")',
                  'Insert ("age", 25)',
                  'Insert ("job", "Engineer")',
                  'Search for key "age": Found, value is 25',
                  'Delete key "job"',
                  'Check if "job" exists: No'
                ]
              }
            ],
            practiceProblems: [
              { id: 10, title: 'Two Sum', difficulty: 'Easy' },
              { id: 11, title: 'LRU Cache', difficulty: 'Medium' },
              { id: 12, title: 'Design HashMap', difficulty: 'Easy' }
            ]
          }
        };

        // Convert structure name to camelCase for lookup
        const camelCaseName = structureName?.toLowerCase().replace(/-/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, '');

        setStructure(mockData[camelCaseName as keyof typeof mockData] || {
          name: structureName,
          description: 'Data structure details not found.',
          category: 'Unknown',
          difficulty: 'Unknown',
          operations: [],
          implementation: 'Not available',
          visualization: 'Not available',
          examples: [],
          practiceProblems: []
        });
        setLoading(false);
      }, 500);
    };

    fetchStructureData();
  }, [structureName]);

  const handleBack = () => {
    navigate('/data-structures');
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
              <p className="text-muted-foreground">Loading data structure details...</p>
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
              <ArrowLeft className="h-4 w-4" /> Back to Data Structures
            </Button>

            <header className="mb-8">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <h1 className="text-3xl font-semibold tracking-tight">{structure.name}</h1>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  structure.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  structure.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {structure.difficulty}
                </span>
              </div>
              <p className="text-muted-foreground">{structure.category}</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Understanding how {structure.name} work</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{structure.description}</p>
                
                <h3 className="font-medium mb-3">Operations & Time Complexity</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {structure.operations && structure.operations.map((op: any, i: number) => (
                    <div key={i} className="bg-secondary/50 p-4 rounded-md">
                      <p className="font-medium mb-1">{op.name}</p>
                      <p className="font-mono text-sm mb-1">{op.complexity}</p>
                      <p className="text-sm text-muted-foreground">{op.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue="implementation" className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto">
                <TabsTrigger value="implementation" className="gap-2">
                  <Code className="h-4 w-4" /> Implementation
                </TabsTrigger>
                <TabsTrigger value="examples" className="gap-2">
                  <PlayCircle className="h-4 w-4" /> Examples
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="implementation" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <pre className="bg-secondary/50 p-4 rounded-md overflow-x-auto">
                      <code>{structure.implementation}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {structure.examples && structure.examples.length > 0 ? (
                      structure.examples.map((example: any, i: number) => (
                        <div key={i} className="mb-6 last:mb-0">
                          <h3 className="font-medium mb-2">{example.title}</h3>
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
                {structure.practiceProblems && structure.practiceProblems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {structure.practiceProblems.map((problem: any) => (
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

export default DataStructureDetail;
