"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function AuthPage() {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Signed in!");
  };

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) alert(error.message);
    else alert("Check your email to confirm sign up!");
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
        <Button onClick={handleLogin}>Sign In</Button>
        <Button variant="outline" onClick={handleSignup}>Sign Up</Button>
      </div>
    </div>
  );
}
