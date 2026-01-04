'use client'

import { ArrowRight, CheckCircle2, PlayCircle, Star } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative isolate min-h-[90vh] flex items-center bg-background border-b border-border/50">
      
      {/* 1. PROFESSIONAL GRID BACKGROUND (Subtle Tech Feel) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Soft Top Spotlight */}
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT: Copy & CTA */}
          <div className="max-w-2xl">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground mb-6 border border-border">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              New: Behavioral Analysis Engine
            </div>

            {/* Solid, Professional Headline */}
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Turn interview anxiety into <span className="text-primary underline decoration-4 decoration-primary/20 underline-offset-4">offer letters</span>.
            </h1>

            {/* Clear Subtext */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Stop memorizing scripts. Practice with an AI that adapts to your role, gives you brutal feedback on your delivery, and helps you articulate your value like a senior professional.
            </p>

            {/* Action Area */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20"
              >
                Start Simulation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/how-it-works"
                className="inline-flex justify-center items-center gap-2 rounded-lg border border-input bg-background px-8 py-4 text-base font-medium text-foreground hover:bg-secondary/50 transition-colors"
              >
                <PlayCircle className="w-4 h-4 text-muted-foreground" />
                View Demo
              </a>
            </div>

            {/* Social Proof / Checkmarks */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-muted-foreground border-t border-border pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Role-specific questions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Instant scoring & feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Feature Preview / "Card Stack" */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
             
             {/* Abstract Background Shape */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -z-10"></div>

             <div className="relative w-full max-w-md space-y-4">
                
                {/* Feature Card 1: Top Layer */}
                <div className="bg-card border border-border shadow-xl rounded-xl p-6 relative z-30 transform transition-transform hover:scale-[1.02] duration-300">
                   <div className="flex justify-between items-start mb-4">
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                         <Star className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">Score: 92/100</span>
                   </div>
                   <h3 className="font-semibold text-lg mb-1">Feedback Report</h3>
                   <p className="text-sm text-muted-foreground">"Great technical accuracy, but you rushed the explanation. Try using the STAR method..."</p>
                </div>

                {/* Feature Card 2: Middle Layer */}
                <div className="bg-card/80 border border-border shadow-lg rounded-xl p-6 relative z-20 scale-95 -mt-4 opacity-90">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm font-medium">Recording in progress...</span>
                   </div>
                   <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full"></div>
                   </div>
                </div>

                 {/* Feature Card 3: Bottom Layer */}
                <div className="bg-card/60 border border-border shadow-md rounded-xl p-6 relative z-10 scale-90 -mt-4 opacity-75 blur-[1px]">
                   <div className="h-4 w-3/4 bg-secondary rounded mb-2"></div>
                   <div className="h-4 w-1/2 bg-secondary rounded"></div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </div>
  )
}