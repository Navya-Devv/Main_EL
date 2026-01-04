"use client";

import React from "react";
import {
  Target,           // Brand Logo (Lakshya = Target)
  UserPlus,         // Account Creation
  SlidersHorizontal,// Configuration
  BrainCircuit,     // AI Intelligence
  Mic,              // Speaking/Responding
  FileCheck,        // Feedback Report
  TrendingUp,       // Growth/Improvement
} from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserPlus size={32} className="text-primary" />,
      title: "Create Your Account",
      description:
        "Sign up securely and set up your Lakshya AI profile. Your progress, preferences, and interview history are stored in one place.",
    },
    {
      icon: <SlidersHorizontal size={32} className="text-primary" />,
      title: "Configure Your Interview",
      description:
        "Choose technical, behavioral, or mixed interviews. Adjust difficulty, focus areas, and duration to align with your target role.",
    },
    {
      icon: <BrainCircuit size={32} className="text-primary" />,
      title: "Begin the AI Interview",
      description:
        "Lakshya AI generates adaptive, role-specific questions using advanced AI models, simulating real interview conditions.",
    },
    {
      icon: <Mic size={32} className="text-primary" />,
      title: "Respond Naturally",
      description:
        "Answer questions using your voice or text. The system evaluates your clarity, relevance, and confidence in real time.",
    },
    {
      icon: <FileCheck size={32} className="text-primary" />,
      title: "Get Actionable Feedback",
      description:
        "Receive instant insights on strengths, gaps, and performance metrics, along with clear guidance for improvement.",
    },
    {
      icon: <TrendingUp size={32} className="text-primary" />,
      title: "Practice & Improve Continuously",
      description:
        "Track growth over time, revisit past interviews, and sharpen your skills through unlimited, targeted practice sessions.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full ring-1 ring-primary/20">
            {/* Changed Bot to Target to match "Lakshya" (Target) */}
            <Target className="text-primary" size={48} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          How Lakshya AI Works
        </h1>

        <p className="text-xl text-muted-foreground">
          A focused, AI-powered interview preparation platform designed to help
          you practice smarter, improve faster, and perform with confidence.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative flex gap-6 bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Step Indicator */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary border border-border">
                {step.icon}
              </div>
              {index !== steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-transparent mt-4" />
              )}
            </div>

            {/* Content */}
            <div className="pt-2">
              <h2 className="text-xl font-semibold text-card-foreground mb-2">
                Step {index + 1}: {step.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1"
        >
          Start Practicing with Lakshya AI
        </a>
      </div>
    </div>
  );
};

export default HowItWorksPage;