"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in cookie
        document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        
        toast.success('Login successful!');
        
        // Redirect based on role
        const redirectPath = data.user.role === 'admin' 
          ? '/dashboard/admin' 
          : data.user.role === 'recruiter'
          ? '/dashboard/recruiter'
          : '/dashboard/candidate';
        
        router.push(redirectPath);
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <Card className="w-full max-w-md glass-effect border-black-tertiary relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-12 gradient-orange rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-primary tracking-tight">
              AI<span className="text-orange-primary">PORTAL</span>
            </span>
          </div>
          <CardTitle className="text-3xl font-black text-gray-primary tracking-wide uppercase">WELCOME BACK</CardTitle>
          <CardDescription className="text-gray-muted text-lg mt-4">
            Sign in to continue your career journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-subtle hover:text-orange-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-orange-primary hover:text-orange-secondary transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full gradient-orange hover:glow-orange text-white font-bold py-4 rounded-xl text-lg tracking-wide uppercase transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-muted">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-orange-primary hover:text-orange-secondary font-bold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}