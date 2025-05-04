// src/lib/validators/prompt.ts (or similar)
import * as z from "zod";

export const promptSchema = z.object({
  prompt: z.string().min(3, { message: "Prompt must be at least 3 characters long." }),
});

export type PromptFormData = z.infer<typeof promptSchema>;