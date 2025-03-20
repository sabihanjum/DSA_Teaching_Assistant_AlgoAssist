import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { Play, Pause, SkipForward, SkipBack, RefreshCw } from 'lucide-react';

type ArrayItemStatus = "default" | "comparing" | "sorted" | "current";

interface ArrayItem {
  value: number;
  status: ArrayItemStatus;
}

interface AlgorithmVisualizerProps {
  algorithm: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick' | 'binary-search';
  arraySize?: number;
  speed?: number;
  autoPlay?: boolean;
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
  algorithm,
  arraySize = 10,
  speed = 1,
  autoPlay = false,
}) => {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [steps, setSteps] = useState<ArrayItem[][]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(autoPlay);
  const [visualizationSpeed, setVisualizationSpeed] = useState(speed);

  const MIN_ARRAY_SIZE = 5;
  const MAX_ARRAY_SIZE = 20;
  const MIN_SPEED = 1;
  const MAX_SPEED = 10;

  // Helper function to generate random array
  const generateRandomArray = (size: number): ArrayItem[] => {
    const arr: ArrayItem[] = [];
    for (let i = 0; i < size; i++) {
      arr.push({
        value: Math.floor(Math.random() * 100) + 1,
        status: "default" as const,
      });
    }
    return arr;
  };

  // Initialize array
  useEffect(() => {
    const initialArray = generateRandomArray(arraySize);
    setArray(initialArray);

    if (algorithm === 'binary-search') {
      // For binary search, generate steps with a target value
      const target = Math.floor(Math.random() * 100) + 1;
      setSteps(generateBinarySearchSteps(initialArray, target));
    } else {
      // For sorting algorithms, generate sorting steps
      setSteps(generateSteps(initialArray));
    }
    setCurrentStep(0);
  }, [algorithm, arraySize]);

  // Handle auto play
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 1000 / visualizationSpeed);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false); // Stop auto-play when finished
    }

    return () => clearTimeout(timeoutId);
  }, [autoPlay, isPlaying, currentStep, steps.length, visualizationSpeed]);

  // Play/pause visualization
  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  // Reset visualization
  const resetVisualization = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    const initialArray = generateRandomArray(arraySize);
    setArray(initialArray);

    if (algorithm === 'binary-search') {
      // For binary search, generate steps with a target value
      const target = Math.floor(Math.random() * 100) + 1;
      setSteps(generateBinarySearchSteps(initialArray, target));
    } else {
      // For sorting algorithms, generate sorting steps
      setSteps(generateSteps(initialArray));
    }
  };

  // Change speed
  const handleSpeedChange = (value: number[]) => {
    setVisualizationSpeed(value[0]);
  };

  // Generate animation steps for sorting algorithms
  const generateSteps = (arr: ArrayItem[]): ArrayItem[][] => {
    const steps: ArrayItem[][] = [];
    const array = [...arr];
    
    // Add initial state
    steps.push(array.map(item => ({ 
      value: item.value, 
      status: "default" as const
    })));

    if (algorithm === 'bubble') {
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          const step = array.map(item => ({ ...item, status: "default" as const }));
          step[j].status = "comparing" as const;
          step[j + 1].status = "comparing" as const;
          steps.push([...step]);

          if (array[j].value > array[j + 1].value) {
            // Swap elements
            const temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;

            const swapStep = array.map(item => ({ ...item, status: "default" as const }));
            swapStep[j].status = "current" as const;
            swapStep[j + 1].status = "current" as const;
            steps.push([...swapStep]);
          }
        }
        array[array.length - i - 1].status = "sorted" as const;
        steps.push([...array.map(item => ({ ...item, status: item.status }))]);
      }
    } else if (algorithm === 'insertion') {
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        const initialStep = array.map(item => ({ ...item, status: "default" as const }));
        initialStep[i].status = "current" as const;
        steps.push([...initialStep]);

        while (j >= 0 && array[j].value > key.value) {
          const compareStep = array.map(item => ({ ...item, status: "default" as const }));
          compareStep[j].status = "comparing" as const;
          compareStep[j + 1].status = "comparing" as const;
          steps.push([...compareStep]);

          array[j + 1] = array[j];
          
          const moveStep = array.map(item => ({ ...item, status: "default" as const }));
          moveStep[j + 1].status = "current" as const;
          if (j > 0) moveStep[j - 1].status = "comparing" as const;
          steps.push([...moveStep]);

          j = j - 1;
        }
        array[j + 1] = key;

        const insertStep = array.map(item => ({ ...item, status: "default" as const }));
        insertStep[j + 1].status = "sorted" as const;
        steps.push([...insertStep]);
      }

      // Mark the entire array as sorted
      const sortedStep = array.map(item => ({ ...item, status: "sorted" as const }));
      steps.push([...sortedStep]);
    } else if (algorithm === 'selection') {
      for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        
        const initialStep = array.map(item => ({ ...item, status: "default" as const }));
        initialStep[i].status = "current" as const;
        steps.push([...initialStep]);

        for (let j = i + 1; j < array.length; j++) {
          const compareStep = array.map(item => ({ ...item, status: "default" as const }));
          compareStep[i].status = "current" as const;
          compareStep[j].status = "comparing" as const;
          steps.push([...compareStep]);

          if (array[j].value < array[minIndex].value) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          const swapStep = array.map(item => ({ ...item, status: "default" as const }));
          swapStep[i].status = "current" as const;
          swapStep[minIndex].status = "current" as const;
          steps.push([...swapStep]);

          // Swap elements
          const temp = array[i];
          array[i] = array[minIndex];
          array[minIndex] = temp;

          const swappedStep = array.map(item => ({ ...item, status: "default" as const }));
          swappedStep[i].status = "sorted" as const;
          swappedStep[minIndex].status = "current" as const;
          steps.push([...swappedStep]);
        }

        array[i].status = "sorted" as const;
        steps.push([...array.map(item => ({ ...item, status: item.status }))]);
      }

      array[array.length - 1].status = "sorted" as const;
      steps.push([...array.map(item => ({ ...item, status: item.status }))]);
    } else if (algorithm === 'merge') {
      const mergeSort = (arr: ArrayItem[]): ArrayItem[] => {
        if (arr.length <= 1) {
          return arr;
        }

        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return merge(mergeSort(left), mergeSort(right));
      };

      const merge = (left: ArrayItem[], right: ArrayItem[]): ArrayItem[] => {
        let result: ArrayItem[] = [];
        let i = 0;
        let j = 0;

        while (i < left.length && j < right.length) {
          const step = array.map(item => ({ ...item, status: "default" as const }));
          
          // Find the indices of left and right in the original array
          const leftIndex = array.findIndex(item => item.value === left[i].value);
          const rightIndex = array.findIndex(item => item.value === right[j].value);

          if (leftIndex !== -1) step[leftIndex].status = "comparing" as const;
          if (rightIndex !== -1) step[rightIndex].status = "comparing" as const;
          
          steps.push([...step]);

          if (left[i].value < right[j].value) {
            result.push(left[i]);
            i++;
          } else {
            result.push(right[j]);
            j++;
          }
        }

        return result.concat(left.slice(i)).concat(right.slice(j));
      };

      mergeSort(array);
    } else if (algorithm === 'quick') {
      const quickSort = (arr: ArrayItem[], low: number, high: number) => {
        if (low < high) {
          const partitionIndex = partition(arr, low, high);

          quickSort(arr, low, partitionIndex - 1);
          quickSort(arr, partitionIndex + 1, high);
        }
      };

      const partition = (arr: ArrayItem[], low: number, high: number): number => {
        const pivot = arr[high].value;
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
          const step = array.map(item => ({ ...item, status: "default" as const }));
          step[j].status = "comparing" as const;
          step[high].status = "current" as const;
          steps.push([...step]);

          if (arr[j].value < pivot) {
            i++;
            const swapStep = array.map(item => ({ ...item, status: "default" as const }));
            swapStep[i].status = "current" as const;
            swapStep[j].status = "current" as const;
            steps.push([...swapStep]);

            // Swap elements
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }

        const finalSwapStep = array.map(item => ({ ...item, status: "default" as const }));
        finalSwapStep[i + 1].status = "current" as const;
        finalSwapStep[high].status = "current" as const;
        steps.push([...finalSwapStep]);

        // Swap arr[i+1] and arr[high]
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        return i + 1;
      };

      quickSort(array, 0, array.length - 1);
    }

    return steps;
  };

  // Generate steps for binary search
  const generateBinarySearchSteps = (arr: ArrayItem[], target: number): ArrayItem[][] => {
    const steps: ArrayItem[][] = [];
    let left = 0;
    let right = arr.length - 1;
    
    // Sort the array first
    const sortedArray = [...arr].sort((a, b) => a.value - b.value);
    
    // Add initial state
    steps.push(sortedArray.map(item => ({ 
      value: item.value, 
      status: "default" as const
    })));
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      // Mark current search range
      const step = sortedArray.map((item, index) => {
        if (index === mid) {
          return { value: item.value, status: "current" as const };
        } else if (index >= left && index <= right) {
          return { value: item.value, status: "comparing" as const };
        } else {
          return { value: item.value, status: "default" as const };
        }
      });
      
      steps.push(step);
      
      if (sortedArray[mid].value === target) {
        // Found the target
        steps.push(sortedArray.map((item, index) => ({
          value: item.value,
          status: index === mid ? "sorted" as const : "default" as const
        })));
        break;
      } else if (sortedArray[mid].value < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    // If not found, mark everything as processed
    if (left > right) {
      steps.push(sortedArray.map(item => ({ 
        value: item.value, 
        status: "default" as const
      })));
    }
    
    return steps;
  };

  // Visualize the array
  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{algorithm.toUpperCase()} Algorithm</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={resetVisualization}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={prevStep} disabled={currentStep === 0}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={nextStep} disabled={currentStep === steps.length - 1}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label htmlFor="speed" className="text-sm font-medium">
          Speed:
        </label>
        <Slider
          id="speed"
          defaultValue={[visualizationSpeed]}
          min={MIN_SPEED}
          max={MAX_SPEED}
          step={1}
          onValueChange={handleSpeedChange}
          className="w-48"
        />

        <label
          htmlFor="auto-play"
          className="text-sm font-medium flex items-center space-x-2"
        >
          Auto Play:
          <Checkbox
            id="auto-play"
            checked={isAutoPlayEnabled}
            onCheckedChange={(checked) => {
              setIsAutoPlayEnabled(!!checked);
              setIsPlaying(!!checked); // Start or stop auto-play
            }}
          />
        </label>
      </div>

      <div className="flex gap-2">
        {steps[currentStep] &&
          steps[currentStep].map((item, index) => (
            <div
              key={index}
              className={`w-8 h-12 flex items-center justify-center rounded-md text-sm font-medium ${
                item.status === "comparing"
                  ? "bg-blue-500 text-white"
                  : item.status === "sorted"
                  ? "bg-green-500 text-white"
                  : item.status === "current"
                  ? "bg-purple-500 text-white"
                  : "bg-secondary text-secondary-foreground"
              }`}
              style={{ height: `${item.value / 1.5}px` }}
            >
              {item.value}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
