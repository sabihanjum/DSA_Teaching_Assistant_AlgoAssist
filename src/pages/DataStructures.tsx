
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { Search, ArrowRight, CheckCircle, Star } from 'lucide-react';

const DataStructures: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const dsCategories = [
    {
      id: 'basic',
      name: 'Basic Data Structures',
      description: 'Fundamental data storage and organization methods',
      structures: [
        { 
          name: 'Arrays', 
          difficulty: 'Easy',
          operations: [
            { name: 'Access', complexity: 'O(1)' },
            { name: 'Search', complexity: 'O(n)' },
            { name: 'Insert', complexity: 'O(n)' },
            { name: 'Delete', complexity: 'O(n)' }
          ],
          completed: true,
          slug: 'arrays'
        },
        { 
          name: 'Linked Lists', 
          difficulty: 'Easy',
          operations: [
            { name: 'Access', complexity: 'O(n)' },
            { name: 'Search', complexity: 'O(n)' },
            { name: 'Insert', complexity: 'O(1)' },
            { name: 'Delete', complexity: 'O(1)' }
          ],
          completed: false,
          slug: 'linked-lists'
        },
        { 
          name: 'Stacks', 
          difficulty: 'Easy',
          operations: [
            { name: 'Push', complexity: 'O(1)' },
            { name: 'Pop', complexity: 'O(1)' },
            { name: 'Peek', complexity: 'O(1)' },
            { name: 'Search', complexity: 'O(n)' }
          ],
          completed: false,
          slug: 'stacks'
        },
        { 
          name: 'Queues', 
          difficulty: 'Easy',
          operations: [
            { name: 'Enqueue', complexity: 'O(1)' },
            { name: 'Dequeue', complexity: 'O(1)' },
            { name: 'Peek', complexity: 'O(1)' },
            { name: 'Search', complexity: 'O(n)' }
          ],
          completed: false,
          slug: 'queues'
        },
      ]
    },
    {
      id: 'trees',
      name: 'Trees',
      description: 'Hierarchical data structures with parent-child relationships',
      structures: [
        { 
          name: 'Binary Trees', 
          difficulty: 'Medium',
          operations: [
            { name: 'Access', complexity: 'O(n)' },
            { name: 'Search', complexity: 'O(n)' },
            { name: 'Insert', complexity: 'O(n)' },
            { name: 'Delete', complexity: 'O(n)' }
          ],
          completed: false,
          slug: 'binary-trees'
        },
        { 
          name: 'Binary Search Trees', 
          difficulty: 'Medium',
          operations: [
            { name: 'Access', complexity: 'O(log n)' },
            { name: 'Search', complexity: 'O(log n)' },
            { name: 'Insert', complexity: 'O(log n)' },
            { name: 'Delete', complexity: 'O(log n)' }
          ],
          completed: false,
          slug: 'binary-search-trees'
        },
        { 
          name: 'AVL Trees', 
          difficulty: 'Hard',
          operations: [
            { name: 'Access', complexity: 'O(log n)' },
            { name: 'Search', complexity: 'O(log n)' },
            { name: 'Insert', complexity: 'O(log n)' },
            { name: 'Delete', complexity: 'O(log n)' }
          ],
          completed: false,
          slug: 'avl-trees'
        },
        { 
          name: 'Heaps', 
          difficulty: 'Medium',
          operations: [
            { name: 'FindMax/Min', complexity: 'O(1)' },
            { name: 'Insert', complexity: 'O(log n)' },
            { name: 'Delete', complexity: 'O(log n)' },
            { name: 'Heapify', complexity: 'O(n)' }
          ],
          completed: false,
          slug: 'heaps'
        },
      ]
    },
    {
      id: 'graphs',
      name: 'Graphs',
      description: 'Collections of nodes/vertices connected by edges',
      structures: [
        { 
          name: 'Directed Graphs', 
          difficulty: 'Medium',
          operations: [
            { name: 'Add Vertex', complexity: 'O(1)' },
            { name: 'Add Edge', complexity: 'O(1)' },
            { name: 'Remove Vertex', complexity: 'O(V+E)' },
            { name: 'Remove Edge', complexity: 'O(E)' }
          ],
          completed: false,
          slug: 'directed-graphs'
        },
        { 
          name: 'Undirected Graphs', 
          difficulty: 'Medium',
          operations: [
            { name: 'Add Vertex', complexity: 'O(1)' },
            { name: 'Add Edge', complexity: 'O(1)' },
            { name: 'Remove Vertex', complexity: 'O(V+E)' },
            { name: 'Remove Edge', complexity: 'O(E)' }
          ],
          completed: false,
          slug: 'undirected-graphs'
        },
        { 
          name: 'Weighted Graphs', 
          difficulty: 'Hard',
          operations: [
            { name: 'Add Vertex', complexity: 'O(1)' },
            { name: 'Add Edge', complexity: 'O(1)' },
            { name: 'Remove Vertex', complexity: 'O(V+E)' },
            { name: 'Remove Edge', complexity: 'O(E)' }
          ],
          completed: false,
          slug: 'weighted-graphs'
        },
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Data Structures',
      description: 'Complex structures for specialized operations',
      structures: [
        { 
          name: 'Hash Tables', 
          difficulty: 'Medium',
          operations: [
            { name: 'Insert', complexity: 'O(1)' },
            { name: 'Delete', complexity: 'O(1)' },
            { name: 'Search', complexity: 'O(1)' },
            { name: 'Collision', complexity: 'O(n)' }
          ],
          completed: false,
          slug: 'hash-tables'
        },
        { 
          name: 'Tries', 
          difficulty: 'Medium',
          operations: [
            { name: 'Insert', complexity: 'O(m)' },
            { name: 'Search', complexity: 'O(m)' },
            { name: 'Delete', complexity: 'O(m)' },
            { name: 'Prefix Search', complexity: 'O(p)' }
          ],
          completed: false,
          slug: 'tries'
        },
        { 
          name: 'Segment Trees', 
          difficulty: 'Hard',
          operations: [
            { name: 'Build', complexity: 'O(n)' },
            { name: 'Query', complexity: 'O(log n)' },
            { name: 'Update', complexity: 'O(log n)' },
            { name: 'Range Update', complexity: 'O(log n)' }
          ],
          completed: false,
          slug: 'segment-trees'
        },
        { 
          name: 'Disjoint Sets', 
          difficulty: 'Medium',
          operations: [
            { name: 'MakeSet', complexity: 'O(1)' },
            { name: 'Find', complexity: 'O(α(n))' },
            { name: 'Union', complexity: 'O(α(n))' },
            { name: 'Connected', complexity: 'O(α(n))' }
          ],
          completed: false,
          slug: 'disjoint-sets'
        },
      ]
    },
  ];

  const filteredCategories = dsCategories.map(category => ({
    ...category,
    structures: category.structures.filter(
      structure => structure.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.structures.length > 0);

  const handleLearnMoreClick = (structureSlug: string) => {
    navigate(`/data-structure/${structureSlug}`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">Data Structures</h1>
              <p className="text-muted-foreground mt-1">Learn essential data structures and their implementations</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mb-8 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search data structures..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue={dsCategories[0].id} className="space-y-6">
              <TabsList className="w-full justify-start overflow-x-auto">
                {dsCategories.map(category => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {dsCategories.map(category => (
                <TabsContent key={category.id} value={category.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {(searchQuery ? filteredCategories.find(c => c.id === category.id)?.structures : category.structures)?.map((structure, i) => (
                          <Card key={i} className="overflow-hidden hover:shadow-md transition-all">
                            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {structure.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                <CardTitle className="text-lg">{structure.name}</CardTitle>
                              </div>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                structure.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                structure.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {structure.difficulty}
                              </span>
                            </CardHeader>
                            <CardContent>
                              <div className="mb-4">
                                <h4 className="text-sm font-semibold mb-2">Time Complexity</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  {structure.operations.map((op, idx) => (
                                    <div key={idx} className="flex justify-between">
                                      <span className="text-muted-foreground">{op.name}:</span>
                                      <span className="font-mono">{op.complexity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <Button 
                                className="w-full mt-2 gap-1"
                                onClick={() => handleLearnMoreClick(structure.slug)}
                              >
                                Learn More <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
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

export default DataStructures;
