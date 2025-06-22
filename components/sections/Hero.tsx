"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap, Target, Brain } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-primary">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(161, 161, 170, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(161, 161, 170, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Radial gradients overlay */}
      <div className="absolute inset-0">
        {/* Primary orange radial gradient - top left */}
        <div 
          className="absolute top-0 left-0 w-[800px] h-[800px] opacity-20"
          style={{
            background: `radial-gradient(circle at center, #FF4C00 0%, rgba(255, 76, 0, 0.3) 25%, rgba(255, 76, 0, 0.1) 50%, transparent 70%)`
          }}
        ></div>
        
        {/* Secondary orange radial gradient - bottom right */}
        <div 
          className="absolute bottom-0 right-0 w-[700px] h-[700px] opacity-15"
          style={{
            background: `radial-gradient(circle at center, #FF6A00 0%, rgba(255, 106, 0, 0.3) 25%, rgba(255, 106, 0, 0.1) 50%, transparent 70%)`
          }}
        ></div>
        
        {/* Accent gradient - center */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10"
          style={{
            background: `radial-gradient(circle at center, #FF8A00 0%, rgba(255, 138, 0, 0.2) 30%, rgba(255, 138, 0, 0.05) 60%, transparent 80%)`
          }}
        ></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-primary/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 glass-effect border-glow rounded-full px-6 py-3 mb-12 group hover:glow-orange transition-all duration-300">
            <Zap className="w-4 h-4 text-orange-primary" />
            <span className="text-sm font-bold text-orange-primary tracking-wider uppercase">AI-POWERED HIRING</span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            <span className="text-gray-primary">LAND YOUR</span>
            <br />
            <span className="gradient-orange bg-clip-text text-transparent text-glow">DREAM JOB</span>
            <br />
            <span className="text-gray-primary">WITH AI</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-muted mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Master interviews with AI coaching, get matched with perfect opportunities, 
            and accelerate your career with our intelligent job portal.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="gradient-orange hover:glow-orange-intense text-white px-12 py-6 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 uppercase group"
              >
                START FREE TRIAL
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-orange-primary/30 hover:border-orange-primary text-gray-primary hover:text-orange-primary px-12 py-6 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 hover:bg-orange-primary/5 uppercase group"
            >
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              WATCH DEMO
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-effect p-8 rounded-2xl border border-black-tertiary hover:border-orange-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-orange transition-all duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-primary mb-4 tracking-wide uppercase">AI INTERVIEWS</h3>
              <p className="text-gray-muted leading-relaxed">Advanced AI coaching tailored to your target role and industry</p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl border border-black-tertiary hover:border-orange-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-orange transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-primary mb-4 tracking-wide uppercase">SMART MATCHING</h3>
              <p className="text-gray-muted leading-relaxed">Precision job matching based on skills, experience, and preferences</p>
            </div>
            
            <div className="glass-effect p-8 rounded-2xl border border-black-tertiary hover:border-orange-primary/30 transition-all duration-300 group">
              <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:glow-orange transition-all duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-primary mb-4 tracking-wide uppercase">INSTANT FEEDBACK</h3>
              <p className="text-gray-muted leading-relaxed">Real-time performance analytics and improvement recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}