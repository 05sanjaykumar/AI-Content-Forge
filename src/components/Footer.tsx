import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
           <div className="flex items-center space-x-2">
             <BrainCircuit className="h-5 w-5 text-muted-foreground" />
             <span className="text-sm text-muted-foreground">
               © {currentYear} AI Content Generator. All rights reserved.
             </span>
           </div>
           <div className="flex space-x-6">
             <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               Privacy Policy
             </Link>
             <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               Terms of Service
             </Link>
              {/* Add Social Links here if needed */}
           </div>
        </div>
      </div>
    </footer>
  );
}