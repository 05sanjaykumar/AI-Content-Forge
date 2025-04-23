import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100), // Add max length if desired
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." })
      .max(100),
    confirmPassword: z.string()
  })
  // Refine the schema to check if passwords match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Show error on the confirm password field
  });
  
  export type SignUpFormData = z.infer<typeof signUpSchema>;