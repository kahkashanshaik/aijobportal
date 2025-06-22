"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: "Free",
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
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
    popular: false
  },
  {
    name: "Basic",
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
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: true
  },
  {
    name: "Premium",
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
    buttonText: "Start Free Trial",
    buttonVariant: "default" as const,
    popular: false
  }
];

export function Pricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, transparent
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> pricing</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your career goals. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-blue-400 shadow-2xl transform scale-105' 
                  : hoveredPlan === index 
                    ? 'border-2 border-blue-300 shadow-xl transform scale-102' 
                    : 'border border-slate-200 hover:shadow-lg'
              }`}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-600">/{plan.period}</span>
                </div>
                <p className="text-slate-600 mb-2">{plan.description}</p>
                <div className="text-sm text-blue-600 font-medium">{plan.credits} interview credits</div>
              </CardHeader>

              <CardContent className="pt-0">
                <Link href="/auth/register">
                  <Button 
                    className={`w-full mb-8 py-3 rounded-full transition-all duration-300 ${
                      plan.buttonVariant === 'default' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl' 
                        : 'border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    variant={plan.buttonVariant}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
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