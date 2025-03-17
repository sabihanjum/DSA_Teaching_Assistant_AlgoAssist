
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  fullWidth?: boolean;
}

const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 20,
  fullWidth = false,
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getDirectionStyles = () => {
    if (direction === 'none') return {};
    
    const directionMap = {
      up: { transform: `translateY(${distance}px)` },
      down: { transform: `translateY(-${distance}px)` },
      left: { transform: `translateX(${distance}px)` },
      right: { transform: `translateX(-${distance}px)` },
    };
    
    return directionMap[direction];
  };

  return (
    <div
      ref={ref}
      className={cn('relative', fullWidth ? 'w-full' : '', className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : undefined,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
        ...(!isVisible && getDirectionStyles()),
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
