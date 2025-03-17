
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeIn from '@/components/animations/FadeIn';
import { useAuth } from '@/context/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-secondary/50 to-transparent" />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-40 right-[15%] w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />
        <div className="absolute bottom-20 left-[20%] w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-3000" />
      </div>
      
      <div className="container max-w-4xl mx-auto z-10">
        <FadeIn delay={100}>
          <span className="inline-block py-1 px-3 mb-4 text-xs font-medium uppercase tracking-wider bg-secondary rounded-full">
            Next-gen DSA Learning
          </span>
        </FadeIn>
        
        <FadeIn delay={300}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master Data Structures & Algorithms with AI Assistance
          </h1>
        </FadeIn>
        
        <FadeIn delay={500}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Interactive learning, personalized feedback, and visual explanations to help you understand complex concepts and ace technical interviews.
          </p>
        </FadeIn>
        
        <FadeIn delay={700}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button size="lg" className="px-6 font-medium text-base">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="px-6 font-medium text-base">
                    Get Started
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button variant="outline" size="lg" className="px-6 font-medium text-base">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Hero;
