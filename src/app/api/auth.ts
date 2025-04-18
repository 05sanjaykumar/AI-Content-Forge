// api/auth.ts
import { supabase } from '@/lib/supabase'; // Your supabase initialization
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, action } = await req.json();

  let response;

  if (action === 'signup') {
    response = await supabase.auth.signUp({ email, password });
  } else if (action === 'signin') {
    response = await supabase.auth.signInWithPassword({ email, password });
  }

  if (response.error) {
    return NextResponse.json({ error: response.error.message }, { status: 400 });
  }

  const { session } = response.data;

  // Setting cookies after successful sign-in or sign-up
  if (session) {
    const res = NextResponse.json({ message: 'Success' });

    res.cookies.set('my-access-token', session.access_token, {
      path: '/',
      httpOnly: true, // To ensure cookies are accessible only via HTTP
      secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
      sameSite: 'Strict', // Prevents CSRF attacks
    });

    res.cookies.set('my-refresh-token', session.refresh_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    return res;
  }

  return NextResponse.json({ error: 'Failed to authenticate' }, { status: 400 });
}
