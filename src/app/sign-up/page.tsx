// app/sign-up/page.tsx
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner"; // Import toast from sonner

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
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
// import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  // const router = useRouter(); // Initialize router if needed for redirection
  const [isLoading, setIsLoading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), // Use the signUpSchema
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "", // Add default value for confirmPassword
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: SignUpFormData) {
    // Don't submit the confirmPassword field to your backend
    const { confirmPassword, ...submitData } = values;
    setIsLoading(true);
    console.log("Form Submitted for Sign Up:", submitData);

    // --- Using sonner's toast.promise for async operations ---
    const signUpPromise = async () => {
        await new Promise((resolve, reject) => setTimeout(() => {
            // Simulate success/failure based on input for demo
            if (submitData.email.includes('@')) { // Example simplistic success condition
                 resolve({ message: `Account created for ${submitData.email}!` });
            } else {
                 reject(new Error("Failed to create account. Please try again."));
            }
        }, 1500));
    };

    toast.promise(signUpPromise(), {
        loading: 'Creating your account...',
        success: (data: any) => {
            console.log("Sign-up successful:", data);
            setIsLoading(false);
            return data?.message || "Account created successfully!";
        },
        error: (error) => {
            console.error("Sign-up error:", error);
            setIsLoading(false);
            return error instanceof Error ? error.message : "An unexpected error occurred.";
        },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle> {/* Changed Title */}
          <CardDescription>
            Enter your information to create an account. {/* Changed Description */}
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
                        autoComplete="new-password" // Use new-password for sign up
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword" // Name matches schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel> {/* Label text */}
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        type="password"
                        autoComplete="new-password" // Use new-password
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage /> {/* Will show the "Passwords do not match" error here */}
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"} {/* Changed Button Text */}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2 text-sm">
           {/* Changed Link */}
           <div className="text-muted-foreground">
               Already have an account?{' '}
               <Link
                  href="/sign-in" // Link to sign-in page
                  className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
               >
                   Sign In
               </Link>
           </div>
        </CardFooter>
      </Card>
    </div>
  );
}