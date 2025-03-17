
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  type: 'signin' | 'signup';
  onSubmit: (data: any) => void;
  isLoading: boolean;
  className?: string;
}

const signinSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, isLoading, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const schema = type === 'signin' ? signinSchema : signupSchema;
  
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'signup' && { username: '', confirmPassword: '' }),
    },
  });

  const handleSubmit = (data: z.infer<typeof schema>) => {
    onSubmit(data);
  };

  return (
    <Card className={cn("w-full max-w-md overflow-hidden", className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-3xl font-semibold tracking-tight">
          {type === 'signin' ? 'Sign In' : 'Create an Account'}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {type === 'signin'
            ? 'Enter your credentials to sign in to your account'
            : 'Fill in the details to create a new account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {type === 'signup' && (
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="johndoe" 
                        {...field} 
                        disabled={isLoading}
                        className="h-11 px-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      {...field} 
                      disabled={isLoading}
                      className="h-11 px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        {...field} 
                        disabled={isLoading}
                        className="h-11 px-4"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {type === 'signup' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                          className="h-11 px-4"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button
              type="submit"
              className="w-full h-11 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {type === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                type === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t px-6 py-4">
        <p className="text-sm text-muted-foreground">
          {type === 'signin' ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="font-medium text-primary hover:underline">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/signin" className="font-medium text-primary hover:underline">
                Sign in
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
