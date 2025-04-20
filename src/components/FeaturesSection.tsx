'use client'; // For Framer Motion

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap, FileText, Share2, Brain, Clock, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Generation",
    description: "Create content in seconds, not hours. Boost your productivity instantly.",
  },
  {
    icon: FileText,
    title: "Versatile Content Types",
    description: "Generate blog posts, emails, ad copy, social media posts, and much more.",
  },
  {
    icon: PenTool, // Changed from Share2
    title: "Multiple Writing Styles",
    description: "Adapt the AI's tone and style to match your brand voice perfectly.",
  },
   {
    icon: Brain,
    title: "Powered by Advanced AI",
    description: "Utilizing state-of-the-art language models for high-quality output.",
  },
   {
    icon: Clock,
    title: "Save Time & Resources",
    description: "Automate content creation and focus on other critical tasks.",
  },
   {
    icon: Share2, // Changed from PenTool
    title: "Easy Integration & Sharing",
    description: "Seamlessly integrate generated content into your workflow.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            Everything you need to supercharge your content
          </p>
           <p className="mt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
            Our AI Content Generator is packed with features designed for efficiency and quality.
          </p>
        </div>

        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           transition={{ staggerChildren: 0.1 }}
           className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}