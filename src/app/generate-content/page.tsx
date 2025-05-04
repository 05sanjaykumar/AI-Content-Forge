// app/dashboard/page.tsx (or your main page route)
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import { promptSchema, type PromptFormData } from "@/lib/validations/prompt"; // Adjust path

// --- Example Suggestions ---
const promptSuggestions = [
  "Write a poem about a rainy day.",
  "Explain the concept of photosynthesis simply.",
  "Generate a list of creative blog post ideas about travel.",
  "Summarize the plot of Hamlet.",
];

// --- Type for History Items ---
interface HistoryItem {
  id: string; // Use a unique ID, timestamp is good
  prompt: string;
  // You could add 'timestamp: Date;' or 'resultPreview: string;' later
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedContent, setGeneratedContent] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  // 1. Define your form.
  const form = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      prompt: "",
    },
  });

  // --- Function to handle the actual content generation ---
  const generateContent = async (prompt: string): Promise<string> => {
    // --- TODO: Replace this with your actual API call or logic ---
    console.log("Generating content for prompt:", prompt);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Simulate potential errors
    if (prompt.toLowerCase().includes("error")) {
        throw new Error("Simulated generation failed for this prompt.");
    }

    // Simulate successful generation
    return `This is the generated content based on your prompt: "${prompt}". \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    // --- End of TODO section ---
  };


  // 2. Define a submit handler.
  async function onSubmit(values: PromptFormData) {
    setIsLoading(true);
    setGeneratedContent(null); // Clear previous content while loading new one

    const currentPrompt = values.prompt;

    const generationPromise = generateContent(currentPrompt);

    toast.promise(generationPromise, {
      loading: 'Generating content...',
      success: (content) => {
        setGeneratedContent(content);
        // Add to history (avoid duplicates, add to start, limit size)
        setHistory((prevHistory) => {
            const newHistoryItem: HistoryItem = { id: Date.now().toString(), prompt: currentPrompt };
            const filteredHistory = prevHistory.filter(item => item.prompt !== currentPrompt);
            return [newHistoryItem, ...filteredHistory].slice(0, 15); // Keep latest 15
        });
        setIsLoading(false);
        // Optionally reset form: form.reset({ prompt: "" }); // Clear input after submit
        return "Content generated successfully!";
      },
      error: (error) => {
        console.error("Generation error:", error);
        setGeneratedContent(null); // Ensure content area is clear on error
        setIsLoading(false);
        return error instanceof Error ? error.message : "Failed to generate content.";
      },
    });
  }

  // --- Handler for clicking a suggestion ---
  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("prompt", suggestion); // Set value in the form
    // Optionally trigger submit immediately:
    // onSubmit({ prompt: suggestion });
  };

  // --- Handler for clicking a history item ---
  const handleHistoryClick = (prompt: string) => {
      form.setValue("prompt", prompt);
      // Maybe clear generated content when loading from history?
      // setGeneratedContent(null);
      // Scroll to top or focus input?
      window.scrollTo({ top: 0, behavior: 'smooth' });
      form.setFocus('prompt');
  }

  return (
    <div className="flex h-full min-h-screen flex-col md:flex-row bg-background">

         {/* History Sidebar */}
      <aside className="w-full md:w-72 lg:w-80 border-l border-border p-4 md:p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Prompts</h2>
        <Separator className="mb-4" />
        {history.length === 0 ? (
           <p className="text-sm text-muted-foreground">Your prompt history will appear here.</p>
        ) : (
            <ScrollArea className="h-[calc(100vh-150px)] md:h-auto md:max-h-[calc(100vh-120px)]"> {/* Adjust height as needed */}
                <div className="space-y-2">
                    {history.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className="w-full h-auto justify-start text-left whitespace-normal text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => handleHistoryClick(item.prompt)}
                            title={item.prompt} // Tooltip for longer prompts
                        >
                           {/* Truncate long prompts visually if needed */}
                           {item.prompt.length > 60 ? item.prompt.substring(0, 57) + '...' : item.prompt}
                        </Button>
                    ))}
                </div>
            </ScrollArea>
        )}
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <h1 className="text-3xl font-bold mb-6">Content Generator</h1>

        {/* Input Form Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Your Prompt</CardTitle>
            <CardDescription>
              Describe what you want to generate. Be specific!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Prompt</FormLabel> {/* Hidden label is ok if CardTitle provides context */}
                      <FormControl>
                        <Input
                          placeholder="e.g., Write a short story about a robot discovering music"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
              <p className="text-sm text-muted-foreground">Or try one of these:</p>
              <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((suggestion, index) => (
                      <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          disabled={isLoading}
                      >
                          {suggestion}
                      </Button>
                  ))}
              </div>
          </CardFooter>
        </Card>

        {/* Generated Content Area */}
        {isLoading && !generatedContent && ( // Show skeleton only when loading initial content
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        )}

        {generatedContent && !isLoading && ( // Show content only when not loading and content exists
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {generatedContent}
              </pre>
            </CardContent>
          </Card>
        )}
      </main>

    </div>
  );
}