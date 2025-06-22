"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Briefcase, TrendingUp, Calendar, Star, Plus } from 'lucide-react';
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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-slate-600">
            Ready to take your career to the next level?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
              <Brain className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInterviews}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}/10</div>
              <p className="text-xs text-muted-foreground">
                +0.5 improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs Applied</CardTitle>
              <Briefcase className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.jobsApplied}</div>
              <p className="text-xs text-muted-foreground">
                3 pending responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.credits}</div>
              <p className="text-xs text-muted-foreground">
                <Link href="/pricing" className="text-blue-600 hover:underline">
                  Buy more credits
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start practicing or find your next opportunity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Brain className="mr-2 h-4 w-4" />
                Start Mock Interview
              </Button>
              <Button variant="outline" className="w-full">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Jobs
              </Button>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Recent Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
              <CardDescription>
                Your latest mock interview sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{interview.position}</h4>
                      <p className="text-sm text-slate-600">{interview.company}</p>
                      <p className="text-xs text-slate-500">{interview.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        Score: {interview.score}/10
                      </Badge>
                      <p className="text-xs text-slate-500">Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Jobs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>
                Jobs that match your skills and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-slate-600">{job.company}</p>
                        <p className="text-xs text-slate-500">{job.location}</p>
                      </div>
                      <Badge variant="secondary">
                        {job.match}% match
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-green-600 mb-3">{job.salary}</p>
                    <Button size="sm" className="w-full">
                      Apply Now
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