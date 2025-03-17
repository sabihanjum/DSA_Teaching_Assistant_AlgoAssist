
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';
import FadeIn from '@/components/animations/FadeIn';

const SignIn: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSignIn = (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-2000" />
      </div>
      
      <div className="w-full max-w-md">
        <FadeIn>
          <div className="text-center mb-8">
            <a href="/" className="inline-block text-2xl font-bold tracking-tight mb-2">
              <span className="font-bold">DSA</span>
              <span className="opacity-70 ml-1">Assistant</span>
            </a>
          </div>
          
          <AuthForm 
            type="signin" 
            onSubmit={handleSignIn} 
            isLoading={isLoading}
            className="border border-border/50 shadow-xl bg-card/90 backdrop-blur-sm"
          />
        </FadeIn>
      </div>
    </div>
  );
};

export default SignIn;
