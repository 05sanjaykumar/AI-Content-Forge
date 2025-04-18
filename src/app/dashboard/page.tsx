// pages/auth.tsx (Client-side Sign In/Sign Up)
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    const action = isSignup ? 'signup' : 'signin';
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, action }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error); // Show error if any
    } else {
      // After successful login/signup, store tokens in cookies on the client-side
      if (data.session) {
        document.cookie = `my-access-token=${data.session.access_token}; Path=/; Secure; SameSite=Strict`;
        document.cookie = `my-refresh-token=${data.session.refresh_token}; Path=/; Secure; SameSite=Strict`;
      }
      
      router.push('/dashboard'); // Redirect to dashboard
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Auth Page</h1>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
      <div className="flex gap-2">
        <Button onClick={handleAuth}>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
      </div>
      <Button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Already have an account?' : 'Sign Up instead'}</Button>
    </div>
  );
}
