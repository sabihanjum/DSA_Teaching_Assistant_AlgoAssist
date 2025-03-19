
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Rewind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface ArrayItem {
  value: number;
  status: 'default' | 'comparing' | 'sorted' | 'current';
}

interface VisualizationStep {
  array: ArrayItem[];
  description: string;
}

interface AlgorithmVisualizerProps {
  algorithm: string;
  initialArray?: number[];
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ 
  algorithm, 
  initialArray = [5, 3, 8, 4, 2, 7, 1, 6] 
}) => {
  const [steps, setSteps] = useState<VisualizationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // milliseconds between steps
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset and generate new visualization steps when algorithm changes
    generateSteps();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [algorithm, initialArray]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, steps.length]);

  const generateSteps = () => {
    let visualizationSteps: VisualizationStep[] = [];
    
    const initialStep: VisualizationStep = {
      array: initialArray.map(value => ({ value, status: 'default' })),
      description: 'Initial array'
    };
    
    visualizationSteps.push(initialStep);
    
    switch(algorithm.toLowerCase()) {
      case 'bubble sort':
        visualizationSteps = generateBubbleSortSteps(initialArray);
        break;
      case 'binary search':
        visualizationSteps = generateBinarySearchSteps(initialArray.sort((a, b) => a - b), 7); // Search for 7
        break;
      default:
        visualizationSteps = [initialStep];
    }
    
    setSteps(visualizationSteps);
    setCurrentStep(0);
  };

  const generateBubbleSortSteps = (arr: number[]): VisualizationStep[] => {
    const steps: VisualizationStep[] = [];
    const array = [...arr];
    const n = array.length;
    
    // Initial state
    steps.push({
      array: array.map(value => ({ value, status: 'default' })),
      description: 'Initial array before sorting'
    });
    
    // Generate steps for bubble sort
    for (let i = 0; i < n; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Mark elements being compared
        const stepArray = array.map((value, index) => ({
          value,
          status: index === j || index === j + 1 
            ? 'comparing' 
            : index >= n - i 
              ? 'sorted' 
              : 'default'
        }));
        
        steps.push({
          array: [...stepArray],
          description: `Comparing ${array[j]} and ${array[j + 1]}`
        });
        
        if (array[j] > array[j + 1]) {
          // Swap elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          
          steps.push({
            array: array.map((value, index) => ({
              value,
              status: index === j || index === j + 1 
                ? 'current' 
                : index >= n - i 
                  ? 'sorted' 
                  : 'default'
            })),
            description: `Swapped ${array[j+1]} and ${array[j]}`
          });
        }
      }
      
      // Mark the largest element as sorted
      steps.push({
        array: array.map((value, index) => ({
          value,
          status: index >= n - i - 1 ? 'sorted' : 'default'
        })),
        description: `Element ${array[n-i-1]} is now in its correct position`
      });
      
      // If no swapping occurred in this pass, array is sorted
      if (!swapped) {
        steps.push({
          array: array.map(value => ({ value, status: 'sorted' })),
          description: 'Array is sorted!'
        });
        break;
      }
    }
    
    // Final sorted array
    steps.push({
      array: array.map(value => ({ value, status: 'sorted' })),
      description: 'Sorting complete!'
    });
    
    return steps;
  };

  const generateBinarySearchSteps = (arr: number[], target: number): VisualizationStep[] => {
    const steps: VisualizationStep[] = [];
    const sortedArray = [...arr].sort((a, b) => a - b);
    
    // Initial state
    steps.push({
      array: sortedArray.map(value => ({ value, status: 'default' })),
      description: `Searching for ${target} in the sorted array`
    });
    
    let left = 0;
    let right = sortedArray.length - 1;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      // Mark current range and midpoint
      steps.push({
        array: sortedArray.map((value, index) => ({
          value,
          status: index === mid 
            ? 'current' 
            : index >= left && index <= right 
              ? 'comparing' 
              : 'default'
        })),
        description: `Checking middle element ${sortedArray[mid]} at index ${mid}`
      });
      
      if (sortedArray[mid] === target) {
        // Found target
        steps.push({
          array: sortedArray.map((value, index) => ({
            value,
            status: index === mid ? 'sorted' : 'default'
          })),
          description: `Found ${target} at index ${mid}!`
        });
        break;
      } else if (sortedArray[mid] < target) {
        // Search right half
        left = mid + 1;
        steps.push({
          array: sortedArray.map((value, index) => ({
            value,
            status: index < left || index > right 
              ? 'default' 
              : 'comparing'
          })),
          description: `${sortedArray[mid]} < ${target}, search the right half`
        });
      } else {
        // Search left half
        right = mid - 1;
        steps.push({
          array: sortedArray.map((value, index) => ({
            value,
            status: index < left || index > right 
              ? 'default' 
              : 'comparing'
          })),
          description: `${sortedArray[mid]} > ${target}, search the left half`
        });
      }
    }
    
    // If target not found
    if (steps[steps.length - 1].description.indexOf("Found") === -1) {
      steps.push({
        array: sortedArray.map(value => ({ value, status: 'default' })),
        description: `${target} not found in the array`
      });
    }
    
    return steps;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSpeedChange = (newSpeed: number[]) => {
    // Convert slider value (1-5) to milliseconds (2000ms to 200ms)
    setSpeed(2200 - newSpeed[0] * 400);
  };

  return (
    <div className="bg-purple-50/50 border border-purple-100 rounded-lg p-6 my-6">
      <h3 className="text-lg font-medium mb-4">Algorithm Visualization</h3>
      
      {/* Visualization Display */}
      <div className="min-h-[200px] flex flex-col items-center justify-center mb-6">
        <div className="flex justify-center items-end h-32 gap-1 mb-6">
          {steps[currentStep]?.array.map((item, index) => (
            <div 
              key={index}
              className={`w-12 transition-all duration-300 ease-in-out flex items-center justify-center
                ${item.status === 'comparing' ? 'bg-yellow-200 border-yellow-400' : 
                  item.status === 'sorted' ? 'bg-green-200 border-green-400' : 
                  item.status === 'current' ? 'bg-purple-200 border-purple-400' : 
                  'bg-slate-200 border-slate-300'} 
                border-2 rounded-t-md`}
              style={{ height: `${(item.value / 10) * 120 + 30}px` }}
            >
              {item.value}
            </div>
          ))}
        </div>
        
        <div className="text-center px-4 py-2 bg-white/80 border border-slate-200 rounded-md min-h-[60px] w-full max-w-md">
          <p className="text-sm">{steps[currentStep]?.description || 'Initializing...'}</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-500">Slow</span>
            <Slider 
              defaultValue={[3]} 
              max={5} 
              min={1} 
              step={1} 
              onValueChange={handleSpeedChange}
              className="w-32"
            />
            <span className="text-xs text-slate-500">Fast</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="p-0 w-8 h-8">
              <Rewind className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleStepBackward}
              disabled={currentStep === 0}
              className="p-0 w-8 h-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            {isPlaying ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePause}
                className="p-0 w-8 h-8">
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePlay}
                disabled={currentStep === steps.length - 1}
                className="p-0 w-8 h-8">
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleStepForward}
              disabled={currentStep === steps.length - 1}
              className="p-0 w-8 h-8">
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div 
            className="bg-purple-500 h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-xs text-slate-500 flex justify-between">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round((currentStep / (steps.length - 1)) * 100)}% complete</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
