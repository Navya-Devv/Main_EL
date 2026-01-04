"use client";

import {
  Target,
  Brain,
  Rocket,
  Users,
  Award,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      
      {/* 1. HERO SECTION WITH GRADIENT GLOW */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 ring-1 ring-primary/20">
            <Target className="text-primary h-8 w-8" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Lakshya AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We are building the bridge between <span className="text-foreground font-medium">nervous preparation</span> and <span className="text-foreground font-medium">confident execution</span>.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-32">
        
        {/* 2. THE PROBLEM & SOLUTION (Bento Style) */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-destructive/5 border border-destructive/10 rounded-3xl p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <XCircle className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <h2 className="text-2xl font-bold">The Old Way</h2>
            </div>
            <ul className="space-y-4 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span> Relying on random question lists
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span> No feedback on your body language
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span> Memorizing answers instead of understanding
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span> Anxiety from fear of the unknown
              </li>
            </ul>
          </div>

          {/* Solution Card */}
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-primary/10 rounded-xl">
                <CheckCircle2 className="text-primary" size={32} />
              </div>
              <h2 className="text-2xl font-bold">The Lakshya Way</h2>
            </div>
            <ul className="space-y-4 text-lg text-muted-foreground relative z-10">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 mt-1 shrink-0" />
                <span>AI-driven questions tailored to your role</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 mt-1 shrink-0" />
                <span>Real-time scoring & improvement tips</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 mt-1 shrink-0" />
                <span>Simulated pressure to build resilience</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-primary w-5 h-5 mt-1 shrink-0" />
                <span>Data-backed confidence building</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 3. CORE PILLARS (Clean Cards with Hover) */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Built on Three Pillars</h2>
            <p className="text-muted-foreground text-lg">
              We focus on the metrics that actually get you hired.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-10 h-10 text-primary" />,
                title: "Adaptive Logic",
                desc: "Our AI doesn't just ask random questions. It listens to you and adapts the difficulty based on your performance."
              },
              {
                icon: <Rocket className="w-10 h-10 text-primary" />,
                title: "Realistic Simulation",
                desc: "We mimic the flow of real interviews—technical deep dives, behavioral checks, and situational challenges."
              },
              {
                icon: <Award className="w-10 h-10 text-primary" />,
                title: "Actionable Feedback",
                desc: "Stop guessing. Get a score out of 10, grammar checks, and specific advice on how to answer better next time."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-card hover:bg-primary/5 border border-border hover:border-primary/20 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                <div className="mb-6 bg-primary/10 w-fit p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. VALUES SECTION */}
        <section className="bg-secondary/30 rounded-3xl p-12 md:p-16 border border-border/50 text-center space-y-12">
           <h2 className="text-3xl font-bold">Our Philosophy</h2>
           <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm">
                   <Users className="text-primary h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl">Candidate First</h3>
                <p className="text-muted-foreground text-sm">Every feature exists to reduce your anxiety.</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm">
                   <Briefcase className="text-primary h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl">Outcome Driven</h3>
                <p className="text-muted-foreground text-sm">We care about you getting the offer letter.</p>
              </div>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center shadow-sm">
                   <Award className="text-primary h-8 w-8" />
                </div>
                <h3 className="font-semibold text-xl">Continuous Growth</h3>
                <p className="text-muted-foreground text-sm">Practice makes permanent. We help you iterate.</p>
              </div>
           </div>
        </section>

        {/* 5. CTA FOOTER */}
        <section className="text-center py-12 space-y-8">
           <h2 className="text-4xl font-bold">Ready to ace your next interview?</h2>
           <p className="text-muted-foreground text-lg max-w-xl mx-auto">
             Join thousands of candidates who are using Lakshya AI to turn nervousness into offers.
           </p>
           <Link href="/dashboard">
             <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg shadow-primary/25 flex items-center gap-2 mx-auto hover:gap-4">
                Start Practicing Now <ArrowRight size={20} />
             </button>
           </Link>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;