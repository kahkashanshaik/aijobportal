"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Brain } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'JOBS', href: '/jobs' },
    { name: 'INTERVIEWS', href: '/interviews' },
    { name: 'RECRUITERS', href: '/recruiters' },
    { name: 'PRICING', href: '#pricing' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-black-tertiary">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center group-hover:glow-orange transition-all duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-primary tracking-tight">
              AI<span className="text-orange-primary">PORTAL</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-muted hover:text-orange-primary transition-all duration-300 font-medium text-sm tracking-wider uppercase relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-orange group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button 
                variant="ghost" 
                className="text-gray-muted hover:text-orange-primary hover:bg-transparent font-medium tracking-wide"
              >
                SIGN IN
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="gradient-orange hover:glow-orange text-white font-bold tracking-wide px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 uppercase text-sm">
                GET STARTED
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-muted hover:text-orange-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-black-tertiary">
            <nav className="flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-muted hover:text-orange-primary transition-colors font-medium tracking-wider uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-6 border-t border-black-tertiary">
                <Link href="/auth/login">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-gray-muted hover:text-orange-primary w-full font-medium tracking-wide"
                  >
                    SIGN IN
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="gradient-orange text-white w-full font-bold tracking-wide uppercase">
                    GET STARTED
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}