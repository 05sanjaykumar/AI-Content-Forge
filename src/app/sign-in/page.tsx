// app/sign-in/page.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner"; 

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signInSchema, type SignInFormData } from "@/lib/validations/auth"; 


export default function SignInPage() {

  const [isLoading, setIsLoading] = React.useState(false);


  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormData) {
    setIsLoading(true);
    console.log("Form Submitted:", values);

    const signInPromise = async () => {


        await new Promise((resolve, reject) => setTimeout(() => {

            if (values.password === 'password') { 
                 resolve({ message: `Welcome back, ${values.email}!` });
            } else {
                 reject(new Error("Invalid credentials. Please try again."));
            }
        }, 1500));
    };

    toast.promise(signInPromise(), {
        loading: 'Attempting to sign in...',
        success: (data: any) => {
            console.log("Sign-in successful:", data);
            setIsLoading(false); 
            return data?.message || "Sign in successful!"; 
        },
        error: (error) => {
            console.error("Sign-in error:", error);
            setIsLoading(false);
            return error instanceof Error ? error.message : "An unexpected error occurred."; 
        },
     
    });


  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 text-sm">
          {/* Optional: Add Forgot Password Link */}
          {/* <Link href="/forgot-password" ... >Forgot your password?</Link> */}
          {/* Optional: Add Sign Up Link */}
          <div className="text-muted-foreground">
            Don't have an account?{' '}
            <Link
               href="/sign-up" // Adjust link as needed
               className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
            >
                Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}