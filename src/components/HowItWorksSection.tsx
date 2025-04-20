'use client'; // For Framer Motion

import { Card, CardContent } from "@/components/ui/card";
import { PencilLine, Sparkles, FileCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const steps = [
  {
    icon: PencilLine,
    title: "1. Provide Input",
    description: "Enter your topic, keywords, desired tone, and content type.",
  },
  {
    icon: Sparkles,
    title: "2. AI Magic Happens",
    description: "Our advanced AI analyzes your input and generates relevant content.",
  },
  {
    icon: FileCheck,
    title: "3. Review & Refine",
    description: "Get high-quality content drafts ready for editing or direct use.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900">
            Get amazing content in 3 simple steps
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="flex flex-col items-center text-center w-full md:w-1/3"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4 border-2 border-primary/20">
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              {/* Optional: Add separators for larger screens */}
              {/* {index < steps.length - 1 && (
                 <Separator orientation="vertical" className="hidden md:block h-16 mx-auto absolute right-[-1rem] top-[calc(50%-2rem)]"/>
              )} */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}