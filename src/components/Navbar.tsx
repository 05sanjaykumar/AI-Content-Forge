'use client'; // Needed for potential future interactions/state

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrainCircuit, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
            <BrainCircuit className="h-6 w-6" />
            <span className="font-bold text-lg">AI Content Gen</span>
          </Link>

          {/* Navigation Links (Optional) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How it Works
            </Link>
            {/* Add Pricing, About, etc. links here if needed */}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
             {/* In a real app, you'd link these to your auth pages/modals */}
            <Button variant="outline" size="sm" asChild>
               <Link href="/login"> {/* Replace with your actual login path */}
                <LogIn className="mr-2 h-4 w-4" /> Log In
               </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup"> {/* Replace with your actual signup path */}
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}