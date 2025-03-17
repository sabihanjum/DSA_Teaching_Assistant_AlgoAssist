
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import FadeIn from '@/components/animations/FadeIn';
import { Send, Bot, User, AlertCircle, Clock } from 'lucide-react';

type MessageType = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to the DSA Assistant! I can help you with Data Structures and Algorithms questions. What would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      if (!isDSARelated(input)) {
        // If question is not DSA related
        const notDSAResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "I'm sorry, but I can only assist with Data Structures and Algorithms related questions. Please ask something related to DSA.",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, notDSAResponse]);
      } else {
        // Generate response if question is DSA related
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: generateDSAResponse(input),
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple check to determine if the question is DSA related
  const isDSARelated = (question: string): boolean => {
    const dsaKeywords = [
      'algorithm', 'data structure', 'time complexity', 'space complexity', 
      'array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash', 
      'sort', 'search', 'binary', 'dynamic programming', 'recursion', 'greedy',
      'big o', 'o(n)', 'bfs', 'dfs', 'backtracking', 'heap', 'trie', 
      'dijkstra', 'bellman', 'kruskal', 'prim', 'topological', 'kmp',
      'leetcode', 'problem', 'coding', 'iteration', 'traversal', 'inorder', 'preorder',
      'postorder', 'complexity'
    ];
    
    const lowerQuestion = question.toLowerCase();
    return dsaKeywords.some(keyword => lowerQuestion.includes(keyword));
  };

  // Simple response generation based on keywords
  const generateDSAResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('time complexity')) {
      return "Time complexity is a measure of the amount of time an algorithm takes to run as a function of the input size. It's typically expressed using Big O notation like O(n) or O(n²).";
    } else if (lowerQuestion.includes('space complexity')) {
      return "Space complexity measures the amount of memory space an algorithm requires as a function of the input size. Like time complexity, it's usually expressed in Big O notation.";
    } else if (lowerQuestion.includes('array')) {
      return "An array is a basic data structure that stores elements of the same type in contiguous memory locations. It provides O(1) access time but may require O(n) time for insertions or deletions.";
    } else if (lowerQuestion.includes('linked list')) {
      return "A linked list is a linear data structure where elements are stored in nodes. Each node points to the next node in the sequence. Linked lists provide O(1) insertion and deletion at any position but O(n) access time.";
    } else if (lowerQuestion.includes('binary search')) {
      return "Binary search is an efficient algorithm for finding an element in a sorted array. It has O(log n) time complexity and works by repeatedly dividing the search space in half.";
    } else if (lowerQuestion.includes('sort')) {
      return "Sorting algorithms arrange elements in a specific order. Common algorithms include Bubble Sort (O(n²)), Merge Sort (O(n log n)), Quick Sort (O(n log n) average case), and Heap Sort (O(n log n)).";
    }
    
    return "That's a great question about " + 
      question.split(' ').slice(0, 3).join(' ') + 
      "... Let me explain. In DSA, this concept is important because it helps optimize algorithm performance and efficiency. Would you like me to elaborate on specific aspects or provide an example?";
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background flex flex-col">
        <div className="container px-4 py-8 mx-auto flex-grow flex flex-col">
          <FadeIn>
            <header className="mb-6">
              <h1 className="text-3xl font-semibold tracking-tight">DSA Assistant</h1>
              <p className="text-muted-foreground mt-1">Ask any question related to Data Structures & Algorithms</p>
            </header>
          </FadeIn>

          <Card className="flex-grow flex flex-col overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Ask me about DSA
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0">
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div 
                      className={`max-w-3/4 rounded-lg px-4 py-2 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.type === 'system'
                            ? 'bg-secondary/70 text-secondary-foreground' 
                            : 'bg-muted text-card-foreground'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 mt-1 flex-shrink-0" />
                        ) : message.type === 'system' ? (
                          <AlertCircle className="h-4 w-4 mt-1 flex-shrink-0" />
                        ) : (
                          <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                        )}
                        <div>
                          <div className="whitespace-pre-wrap">
                            {message.content}
                          </div>
                          <div className="text-xs mt-1 opacity-70 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-card-foreground rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask a question about data structures or algorithms..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                    className="flex-grow"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!input.trim() || isLoading}
                    className="gap-1"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-2 italic">
                  Note: This assistant only answers questions related to Data Structures & Algorithms.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Assistant;
