// src/app/authentication-page/page.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const action = isSignup ? 'signup' : 'signin';
      const res = await fetch('/api/log-sign', { // Updated to correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, action }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {isSignup ? 'Create Account' : 'Sign In'}
      </h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-6"
      />
      
      <Button 
        onClick={handleAuth}
        disabled={isLoading}
        className="w-full mb-4"
      >
        {isLoading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
      </Button>
      
      <Button 
        variant="outline"
        onClick={() => setIsSignup(!isSignup)}
        className="w-full"
      >
        {isSignup ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </Button>
    </div>
  );
}