"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, MessageSquare, BarChart3, Shield, Zap } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-POWERED INTERVIEWS",
    description: "Advanced AI that adapts to your responses and provides personalized coaching for maximum improvement."
  },
  {
    icon: Target,
    title: "PRECISION JOB MATCHING",
    description: "Our intelligent algorithm analyzes your profile to find opportunities that perfectly align with your goals."
  },
  {
    icon: MessageSquare,
    title: "REAL-TIME FEEDBACK",
    description: "Instant performance analysis with detailed scoring and actionable improvement recommendations."
  },
  {
    icon: BarChart3,
    title: "ADVANCED ANALYTICS",
    description: "Comprehensive progress tracking with detailed metrics and performance insights over time."
  },
  {
    icon: Shield,
    title: "ENTERPRISE SECURITY",
    description: "Military-grade encryption and privacy protection for all your personal and professional data."
  },
  {
    icon: Zap,
    title: "LIGHTNING PERFORMANCE",
    description: "Optimized for speed with instant AI responses and seamless experience across all devices."
  }
];

export function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-black-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-orange-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-orange-secondary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-gray-primary mb-8 tracking-tight">
            EVERYTHING YOU NEED TO
            <br />
            <span className="gradient-orange bg-clip-text text-transparent text-glow">DOMINATE</span>
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed font-medium">
            Cutting-edge AI technology designed to accelerate your career and transform your job search experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer transition-all duration-500 glass-effect border-black-tertiary hover:border-orange-primary/50 ${
                hoveredIndex === index 
                  ? 'glow-orange transform scale-105' 
                  : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-10">
                <div className={`w-20 h-20 rounded-2xl gradient-orange flex items-center justify-center mb-8 transition-all duration-500 ${
                  hoveredIndex === index ? 'glow-orange-intense transform rotate-12 scale-110' : 'group-hover:scale-110'
                }`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-primary mb-6 tracking-wide uppercase">{feature.title}</h3>
                <p className="text-gray-muted leading-relaxed text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}