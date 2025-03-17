
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserLevel } from '@/components/UserLevelSelection';
import { useToast } from '@/hooks/use-toast';
import FadeIn from '@/components/animations/FadeIn';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: number;
  }[];
}

const Assessment: React.FC = () => {
  const { user, updateUserLevel } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "Which of the following best describes your experience with programming?",
      options: [
        { text: "I'm new to programming", points: 0 },
        { text: "I've written some code but not extensively", points: 1 },
        { text: "I'm comfortable with programming concepts", points: 2 },
        { text: "I have significant programming experience", points: 3 }
      ]
    },
    {
      id: 2,
      text: "Have you implemented any data structures manually?",
      options: [
        { text: "No, I haven't", points: 0 },
        { text: "I've implemented simple ones like arrays or linked lists", points: 1 },
        { text: "I've implemented several different data structures", points: 2 },
        { text: "I've implemented advanced data structures", points: 3 }
      ]
    },
    {
      id: 3,
      text: "How comfortable are you with Big O notation?",
      options: [
        { text: "I'm not familiar with it", points: 0 },
        { text: "I understand the basics", points: 1 },
        { text: "I can analyze algorithm complexity", points: 2 },
        { text: "I can optimize algorithms for time/space complexity", points: 3 }
      ]
    },
    {
      id: 4,
      text: "Which sorting algorithms are you familiar with?",
      options: [
        { text: "None", points: 0 },
        { text: "Bubble sort, selection sort", points: 1 },
        { text: "Quick sort, merge sort, heap sort", points: 2 },
        { text: "Advanced sorting algorithms and their applications", points: 3 }
      ]
    },
    {
      id: 5,
      text: "Have you solved coding challenges or competitive programming problems?",
      options: [
        { text: "Never", points: 0 },
        { text: "A few easy problems", points: 1 },
        { text: "Regular practice with medium difficulty", points: 2 },
        { text: "Frequently solve difficult problems", points: 3 }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: parseInt(value)
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
    const maxPoints = questions.length * 3;
    const percentage = (totalPoints / maxPoints) * 100;
    
    let level: UserLevel;
    if (percentage < 33) {
      level = 'beginner';
    } else if (percentage < 66) {
      level = 'intermediate';
    } else {
      level = 'advanced';
    }
    
    setShowResults(true);
    updateUserLevel(level);
  };

  const handleComplete = () => {
    toast({
      title: "Assessment completed",
      description: "Your level has been updated successfully",
    });
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-background">
        <div className="container max-w-2xl px-4 py-8 mx-auto">
          <FadeIn>
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">Skill Assessment</h1>
              <p className="text-muted-foreground mt-1">Let's determine your DSA knowledge level</p>
            </header>
          </FadeIn>

          <FadeIn delay={100}>
            {!showResults ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(((currentQuestion + 1) / questions.length) * 100)}% complete
                    </span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-4">{questions[currentQuestion].text}</h2>
                    <RadioGroup 
                      value={answers[questions[currentQuestion].id]?.toString() || ""} 
                      onValueChange={handleAnswer}
                      className="space-y-3"
                    >
                      {questions[currentQuestion].options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-3 border p-3 rounded-md hover:bg-secondary/30 transition-colors">
                          <RadioGroupItem value={option.points.toString()} id={`option-${i}`} />
                          <label htmlFor={`option-${i}`} className="flex-grow cursor-pointer">
                            {option.text}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={answers[questions[currentQuestion].id] === undefined}
                    className="gap-1"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>Next <ArrowRight className="h-4 w-4" /></>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
                  <CardDescription>Based on your answers, we've determined your level</CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="bg-primary/10 rounded-lg p-6 mb-4">
                    <h3 className="text-lg mb-2">Your DSA proficiency level:</h3>
                    <div className="text-3xl font-bold text-primary capitalize">
                      {user?.level}
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    We'll tailor your learning experience based on this assessment.
                    You can always update your level later from your profile settings.
                  </p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button onClick={handleComplete} size="lg">
                    Continue to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            )}
          </FadeIn>
        </div>
      </main>
    </>
  );
};

export default Assessment;
