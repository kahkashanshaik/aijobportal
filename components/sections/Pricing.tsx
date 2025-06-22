"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: "STARTER",
    price: 0,
    period: "month",
    description: "Perfect for getting started",
    credits: 5,
    features: [
      "5 AI mock interviews",
      "Basic job matching",
      "Email support",
      "Resume builder",
      "Interview tips"
    ],
    buttonText: "GET STARTED",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "PROFESSIONAL",
    price: 19,
    period: "month",
    description: "Ideal for active job seekers",
    credits: 50,
    features: [
      "50 AI mock interviews",
      "Advanced job matching",
      "Priority support",
      "Detailed feedback reports",
      "Industry-specific questions",
      "Performance analytics",
      "Resume optimization"
    ],
    buttonText: "START FREE TRIAL",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "ENTERPRISE",
    price: 49,
    period: "month",
    description: "For serious career advancement",
    credits: 200,
    features: [
      "200 AI mock interviews",
      "Premium job matching",
      "24/7 priority support",
      "Advanced analytics",
      "Custom interview scenarios",
      "1-on-1 career coaching",
      "Salary negotiation tips",
      "LinkedIn optimization"
    ],
    buttonText: "START FREE TRIAL",
    buttonVariant: "default" as const,
    popular: false
  }
];

export function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-32 bg-black-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-orange-secondary/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-gray-primary mb-8 tracking-tight">
            SIMPLE, TRANSPARENT
            <br />
            <span className="gradient-orange bg-clip-text text-transparent text-glow">PRICING</span>
          </h2>
          <p className="text-xl text-gray-muted max-w-3xl mx-auto leading-relaxed font-medium">
            Choose the perfect plan for your career goals. Upgrade or downgrade at any time with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-500 glass-effect ${
                plan.popular 
                  ? 'border-orange-primary glow-orange transform scale-105' 
                  : hoveredPlan === index 
                    ? 'border-orange-primary/50 glow-orange transform scale-102' 
                    : 'border-black-tertiary hover:border-orange-primary/30'
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <Badge className="gradient-orange text-white px-6 py-2 rounded-full font-bold tracking-wider uppercase glow-orange">
                    <Star className="w-4 h-4 mr-2" />
                    MOST POPULAR
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-12">
                <CardTitle className="text-3xl font-black text-gray-primary mb-4 tracking-wider uppercase">{plan.name}</CardTitle>
                <div className="mb-6">
                  <span className="text-6xl font-black text-orange-primary">${plan.price}</span>
                  <span className="text-gray-muted text-xl font-medium">/{plan.period}</span>
                </div>
                <p className="text-gray-muted mb-4 text-lg">{plan.description}</p>
                <div className="inline-flex items-center gap-2 glass-effect border-orange-primary/30 rounded-full px-4 py-2">
                  <Zap className="w-4 h-4 text-orange-primary" />
                  <span className="text-sm font-bold text-orange-primary tracking-wider uppercase">{plan.credits} CREDITS</span>
                </div>
              </CardHeader>

              <CardContent className="pt-0 px-8 pb-8">
                <Link href="/auth/register">
                  <Button 
                    className={`w-full mb-10 py-4 rounded-xl font-bold text-lg tracking-wider uppercase transition-all duration-300 ${
                      plan.buttonVariant === 'default' 
                        ? 'gradient-orange hover:glow-orange-intense text-white transform hover:scale-105' 
                        : 'border-2 border-orange-primary/50 hover:border-orange-primary text-orange-primary hover:bg-orange-primary/10'
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>

                <ul className="space-y-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-6 h-6 text-orange-primary mr-4 flex-shrink-0" />
                      <span className="text-gray-muted text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}