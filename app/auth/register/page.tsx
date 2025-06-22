"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in cookie
        document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
        
        toast.success('Account created successfully!');
        
        // Redirect based on role
        const redirectPath = data.user.role === 'admin' 
          ? '/dashboard/admin' 
          : data.user.role === 'recruiter'
          ? '/dashboard/recruiter'
          : '/dashboard/candidate';
        
        router.push(redirectPath);
      } else {
        toast.error(data.error || 'Registration failed');
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
          <CardTitle className="text-3xl font-black text-gray-primary tracking-wide uppercase">CREATE ACCOUNT</CardTitle>
          <CardDescription className="text-gray-muted text-lg mt-4">
            Join thousands of professionals advancing their careers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-gray-primary font-medium tracking-wide uppercase text-sm">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl"
                  required
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl"
                  required
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="role" className="text-gray-primary font-medium tracking-wide uppercase text-sm">I am a</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="bg-black-secondary border-black-tertiary text-gray-primary focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-black-secondary border-black-tertiary">
                  <SelectItem value="candidate" className="text-gray-primary hover:bg-orange-primary/10">Job Seeker / Candidate</SelectItem>
                  <SelectItem value="recruiter" className="text-gray-primary hover:bg-orange-primary/10">Recruiter / HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-gray-primary font-medium tracking-wide uppercase text-sm">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-black-secondary border-black-tertiary text-gray-primary placeholder:text-gray-subtle focus:border-orange-primary focus:ring-orange-primary/20 h-12 rounded-xl pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-subtle hover:text-orange-primary transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full gradient-orange hover:glow-orange text-white font-bold py-4 rounded-xl text-lg tracking-wide uppercase transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-muted">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-orange-primary hover:text-orange-secondary font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}