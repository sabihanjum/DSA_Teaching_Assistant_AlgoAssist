
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Star, Sparkles, HelpCircle } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export type UserLevel = 'beginner' | 'intermediate' | 'advanced' | null;

interface UserLevelSelectionProps {
  open: boolean;
  onSelect: (level: UserLevel) => void;
}

const UserLevelSelection: React.FC<UserLevelSelectionProps> = ({ open, onSelect }) => {
  const [selectedLevel, setSelectedLevel] = useState<UserLevel>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (selectedLevel) {
      onSelect(selectedLevel);
      toast({
        title: "Level selected",
        description: `You've selected the ${selectedLevel} level.`,
      });
    } else {
      toast({
        title: "Please select a level",
        description: "Select your experience level or take the assessment.",
        variant: "destructive",
      });
    }
  };

  const startAssessment = () => {
    navigate('/assessment');
    onSelect(null);
  };

  const levels = [
    {
      value: 'beginner',
      label: 'Beginner',
      description: 'New to programming or data structures & algorithms',
      icon: <Star className="h-5 w-5 text-blue-500" />,
    },
    {
      value: 'intermediate',
      label: 'Intermediate',
      description: 'Familiar with basic algorithms and data structures',
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      value: 'advanced',
      label: 'Advanced',
      description: 'Experienced with complex algorithms and optimizations',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">What's your experience level?</DialogTitle>
          <DialogDescription>
            Select your current proficiency with Data Structures & Algorithms
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup
            value={selectedLevel || ''}
            onValueChange={(value) => setSelectedLevel(value as UserLevel)}
            className="space-y-3"
          >
            {levels.map((level) => (
              <FadeIn key={level.value} delay={levels.findIndex(l => l.value === level.value) * 100}>
                <Card className={`cursor-pointer transition-all ${
                  selectedLevel === level.value ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/50'
                }`}>
                  <CardContent className="p-3">
                    <label
                      htmlFor={`level-${level.value}`}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <RadioGroupItem
                        value={level.value}
                        id={`level-${level.value}`}
                        className="sr-only"
                      />
                      <div className="flex-shrink-0">{level.icon}</div>
                      <div className="flex-grow">
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </div>
                    </label>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </RadioGroup>

          <FadeIn delay={400}>
            <Button 
              variant="outline" 
              className="w-full mt-4 gap-2" 
              onClick={startAssessment}
            >
              <HelpCircle className="h-4 w-4" />
              Not sure? Take a quick assessment
            </Button>
          </FadeIn>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserLevelSelection;
