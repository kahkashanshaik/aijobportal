"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Mock Interviews",
    description: "Practice with intelligent AI that adapts to your responses and provides personalized feedback."
  },
  {
    icon: Target,
    title: "Smart Job Matching",
    description: "Our AI analyzes your skills, experience, and preferences to find the perfect job matches."
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description: "Get instant feedback on your interview performance with detailed scoring and improvement tips."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with comprehensive analytics and performance metrics."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy measures."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant AI responses and seamless user experience across all devices."
  }
];

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> succeed</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful AI-driven features designed to accelerate your job search and interview preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                hoveredIndex === index 
                  ? 'border-blue-300 shadow-xl transform scale-105' 
                  : 'border-slate-200 hover:border-blue-200'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 transition-all duration-300 ${
                  hoveredIndex === index ? 'transform rotate-12 scale-110' : ''
                }`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}