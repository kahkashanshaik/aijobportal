"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Briefcase, TrendingUp, Calendar, Star, Plus, Zap } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    jobsApplied: 0,
    credits: 0,
  });

  useEffect(() => {
    // Fetch user data and stats
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setStats({
          totalInterviews: 12,
          averageScore: 7.8,
          jobsApplied: 5,
          credits: data.user.credits,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const recentInterviews = [
    {
      id: 1,
      position: 'Frontend Developer',
      company: 'TechCorp',
      score: 8.5,
      date: '2025-01-10',
      status: 'completed'
    },
    {
      id: 2,
      position: 'React Developer',
      company: 'StartupXYZ',
      score: 7.2,
      date: '2025-01-08',
      status: 'completed'
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Google',
      location: 'Mountain View, CA',
      match: 95,
      salary: '$120k - $180k'
    },
    {
      id: 2,
      title: 'React Developer',
      company: 'Meta',
      location: 'Menlo Park, CA',
      match: 88,
      salary: '$110k - $160k'
    },
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black-primary">
        <div className="text-center">
          <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-muted text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black-primary">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-gray-primary mb-4 tracking-tight">
            WELCOME BACK, <span className="gradient-orange bg-clip-text text-transparent">{user.firstName.toUpperCase()}</span>!
          </h1>
          <p className="text-xl text-gray-muted">
            Ready to dominate your next interview?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="glass-effect border-black-tertiary hover:border-orange-primary/50 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-bold text-gray-muted tracking-wider uppercase">Total Interviews</CardTitle>
              <Brain className="h-6 w-6 text-orange-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-primary">{stats.totalInterviews}</div>
              <p className="text-xs text-orange-primary font-medium">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-black-tertiary hover:border-orange-primary/50 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-bold text-gray-muted tracking-wider uppercase">Average Score</CardTitle>
              <Star className="h-6 w-6 text-orange-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-primary">{stats.averageScore}/10</div>
              <p className="text-xs text-orange-primary font-medium">
                +0.5 improvement
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-black-tertiary hover:border-orange-primary/50 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-bold text-gray-muted tracking-wider uppercase">Jobs Applied</CardTitle>
              <Briefcase className="h-6 w-6 text-orange-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-primary">{stats.jobsApplied}</div>
              <p className="text-xs text-orange-primary font-medium">
                3 pending responses
              </p>
            </CardContent>
          </Card>

          <Card className="glass-effect border-black-tertiary hover:border-orange-primary/50 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-bold text-gray-muted tracking-wider uppercase">Credits</CardTitle>
              <Zap className="h-6 w-6 text-orange-primary group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-gray-primary">{stats.credits}</div>
              <p className="text-xs text-orange-primary font-medium">
                <Link href="/pricing" className="hover:underline">
                  Buy more credits
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card className="glass-effect border-black-tertiary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-primary tracking-wide uppercase">Quick Actions</CardTitle>
              <CardDescription className="text-gray-muted text-lg">
                Start practicing or find your next opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gradient-orange hover:glow-orange text-white font-bold py-4 rounded-xl text-lg tracking-wide uppercase transition-all duration-300">
                <Brain className="mr-3 h-6 w-6" />
                START MOCK INTERVIEW
              </Button>
              <Button variant="outline" className="w-full border-2 border-orange-primary/50 hover:border-orange-primary text-orange-primary hover:bg-orange-primary/10 font-bold py-4 rounded-xl text-lg tracking-wide uppercase">
                <Briefcase className="mr-3 h-6 w-6" />
                BROWSE JOBS
              </Button>
              <Button variant="outline" className="w-full border-2 border-orange-primary/50 hover:border-orange-primary text-orange-primary hover:bg-orange-primary/10 font-bold py-4 rounded-xl text-lg tracking-wide uppercase">
                <Plus className="mr-3 h-6 w-6" />
                UPDATE PROFILE
              </Button>
            </CardContent>
          </Card>

          {/* Recent Interviews */}
          <Card className="glass-effect border-black-tertiary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-primary tracking-wide uppercase">Recent Interviews</CardTitle>
              <CardDescription className="text-gray-muted text-lg">
                Your latest mock interview sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-6 glass-effect border border-black-tertiary rounded-xl hover:border-orange-primary/30 transition-all duration-300">
                    <div>
                      <h4 className="font-bold text-gray-primary text-lg">{interview.position}</h4>
                      <p className="text-gray-muted">{interview.company}</p>
                      <p className="text-xs text-gray-subtle">{interview.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="gradient-orange text-white mb-2 font-bold">
                        Score: {interview.score}/10
                      </Badge>
                      <p className="text-xs text-gray-subtle uppercase tracking-wide">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card className="lg:col-span-2 glass-effect border-black-tertiary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-primary tracking-wide uppercase">Recommended Jobs</CardTitle>
              <CardDescription className="text-gray-muted text-lg">
                Jobs that match your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-6 glass-effect border border-black-tertiary rounded-xl hover:border-orange-primary/50 hover:glow-orange transition-all duration-300 group">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-primary text-lg">{job.title}</h4>
                        <p className="text-gray-muted">{job.company}</p>
                        <p className="text-xs text-gray-subtle">{job.location}</p>
                      </div>
                      <Badge className="gradient-orange text-white font-bold">
                        {job.match}% match
                      </Badge>
                    </div>
                    <p className="text-lg font-bold text-orange-primary mb-4">{job.salary}</p>
                    <Button className="w-full gradient-orange hover:glow-orange text-white font-bold py-3 rounded-xl tracking-wide uppercase transition-all duration-300">
                      APPLY NOW
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}