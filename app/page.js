"use client";

import { useState, useEffect } from "react";
import {
  Code,
  Brain,
  FileText,
  Target,
  BookOpen,
  Lightbulb,
  Award,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Search,
  Zap,
  Gift,
  Heart,
  Shield,
  Puzzle,
  BarChart,
  Users,
  Star
} from "lucide-react";
import HeroSection from "./dashboard/_components/HeroSection"; // RESTORED HERO IMPORT

// --- COMPONENTS ---

const ResourceCard = ({ icon, title, description, links, stats }) => (
  <div className="group bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full">
    {/* Free badge */}
    <div className="absolute -top-2 -right-2 z-10">
      <div className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
        <Gift size={10} />
        FREE
      </div>
    </div>
    
    {/* Hover Effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-primary/10 transition-all duration-500 -z-10" />
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 to-primary group-hover:from-primary group-hover:to-primary/80 transition-all" />
    
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-primary/10 p-3 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
              {icon}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {stats && (
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {stats.rating}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  {stats.community}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
      
      {/* Progress Bar */}
      {stats?.progress && (
        <div className="pt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Community completion</span>
            <span>{stats.progress}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${stats.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>

    <div className="mt-8 space-y-3 pt-6 border-t border-border/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Free Resources</span>
        <span className="text-xs text-muted-foreground">{links.length} links</span>
      </div>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/50 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 group/link"
        >
          <span className="flex items-center gap-3">
            <span className="text-xs font-bold text-muted-foreground group-hover/link:text-primary min-w-[1rem]">{index + 1}.</span>
            <div className="flex flex-col">
              <span className="font-semibold">{link.name}</span>
            </div>
          </span>
          <ExternalLink className="w-4 h-4 opacity-70 group-hover/link:opacity-100 transition-all" />
        </a>
      ))}
    </div>
  </div>
);

// --- MAIN PAGE ---

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("tech");
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resourceCategories = {
    tech: {
      label: "Technical Mastery",
      icon: <Code size={20} />,
      description: "Free resources to build strong fundamentals in coding, system design, and development",
      resources: [
        {
          title: "Algorithm Excellence",
          description: "Master data structures and algorithms with completely free curated problem sets",
          icon: <Puzzle size={24} />,
          stats: { rating: "4.8", community: "50K+", progress: 75 },
          links: [
            { name: "LeetCode (Free)", url: "https://leetcode.com/" },
            { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/" },
            { name: "HackerRank", url: "https://www.hackerrank.com/" },
            { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
          ],
        },
        {
          title: "System Architecture",
          description: "Learn to design scalable systems with free resources on microservices and cloud patterns",
          icon: <Target size={24} />,
          stats: { rating: "4.9", community: "35K+", progress: 45 },
          links: [
            { name: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
            { name: "InterviewBit", url: "https://www.interviewbit.com/" },
            { name: "High Scalability", url: "http://highscalability.com/" },
          ],
        },
        {
          title: "Development Skills",
          description: "Learn modern frameworks and best practices with completely free resources",
          icon: <Code size={24} />,
          stats: { rating: "4.7", community: "42K+", progress: 60 },
          links: [
            { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { name: "React Docs", url: "https://reactjs.org/" },
            { name: "W3Schools", url: "https://www.w3schools.com/" },
          ],
        },
      ],
    },
    aptitude: {
      label: "Aptitude & Logic",
      icon: <Brain size={20} />,
      description: "Free resources to sharpen quantitative, logical, and analytical reasoning abilities",
      resources: [
        {
          title: "Quantitative Aptitude",
          description: "Free practice for placement tests and screening rounds - no cost, no limits",
          icon: <BarChart size={24} />,
          stats: { rating: "4.6", community: "65K+", progress: 85 },
          links: [
            { name: "Naukri Aptitude", url: "https://www.naukri.com/campus/career-guidance/quantitative-aptitude-questions-answers" },
            { name: "IndiaBix", url: "https://www.indiabix.com/" },
            { name: "Freshersworld", url: "https://www.freshersworld.com/" },
            { name: "Aptitude Prep", url: "https://www.aptitudeprep.com/" },
          ],
        },
        {
          title: "Advanced Competitive",
          description: "Completely free resources for GATE, CAT, GRE, and competitive programming",
          icon: <Award size={24} />,
          stats: { rating: "4.8", community: "28K+", progress: 30 },
          links: [
            { name: "GATE Overflow", url: "https://gateoverflow.in/" },
            { name: "Brilliant (Free)", url: "https://brilliant.org/" },
            { name: "NPTEL", url: "https://nptel.ac.in/" },
          ],
        },
      ],
    },
    softskills: {
      label: "Soft Skills",
      icon: <Users size={20} />,
      description: "Enhance your personality, communication, and professional etiquette",
      resources: [
        {
          title: "Soft Skills Assessment",
          description: "Test your soft skills with professional assessments and get detailed feedback",
          icon: <Lightbulb size={24} />,
          stats: { rating: "4.9", community: "30K+", progress: 95 },
          links: [
            { name: "Skillogy Assessments", url: "https://skillogy.com/assessments/" },
            { name: "Communication Skills", url: "https://www.mindtools.com/" },
            { name: "Professional Ethics", url: "https://www.toastmasters.org/" },
          ],
        },
      ],
    },
    interview: {
      label: "Interview Strategy",
      icon: <FileText size={20} />,
      description: "Free guides to master behavioral questions, communication, and interview psychology",
      resources: [
        {
          title: "Behavioral Mastery",
          description: "Free guides on STAR methodology and behavioral interview preparation",
          icon: <Users size={24} />,
          stats: { rating: "4.9", community: "40K+", progress: 90 },
          links: [
            { name: "AmbitionBox", url: "https://www.ambitionbox.com/" },
            { name: "Glassdoor", url: "https://www.glassdoor.com/" },
            { name: "InterviewBit HR", url: "https://www.interviewbit.com/" },
          ],
        },
        {
          title: "Free Certifications",
          description: "Completely free learning paths and certifications from top platforms",
          icon: <BookOpen size={24} />,
          stats: { rating: "4.7", community: "55K+", progress: 50 },
          links: [
            { name: "Coursera (Audit)", url: "https://www.coursera.org/" },
            { name: "edX (Audit)", url: "https://www.edx.org/" },
            { name: "Swayam", url: "https://swayam.gov.in/" },
          ],
        },
      ],
    },
  };

  const freePlatformBenefits = [
    { icon: <Gift size={16} />, text: "100% Free Forever" },
    { icon: <Shield size={16} />, text: "No Credit Card" },
    { icon: <Heart size={16} />, text: "Community Driven" },
    { icon: <Zap size={16} />, text: "Unlimited Access" },
  ];

  return (
    <>
      {/* 1. RESTORED HERO SECTION */}
      <HeroSection />

      <div className="bg-background min-h-screen py-12 px-4 relative overflow-hidden">
        
        {/* Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* HEADER SECTION */}
          <section className="text-center max-w-3xl mx-auto space-y-6 pt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold animate-in fade-in slide-in-from-top-4">
              <Gift size={16} />
              Completely Free Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Your <span className="text-primary">100% Free</span> Learning Hub
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Access premium-quality resources without any cost. Everything here is free, 
              including our <span className="font-bold text-primary">Lakshya AI</span> interview platform.
            </p>

            {/* Benefits Tags */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {freePlatformBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm font-medium shadow-sm"
                >
                  <div className="text-primary">{benefit.icon}</div>
                  <span className="text-foreground/80">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto pt-6 relative">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search resources, topics, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORY TABS (FIXED LAYOUT) */}
          <section className="flex flex-col items-center gap-8">
            <div className="w-full flex justify-center">
              {/* Added flex-wrap for mobile responsiveness */}
              <div className="bg-card border border-border/50 p-2 rounded-2xl flex flex-wrap justify-center gap-2 shadow-sm max-w-full">
                {Object.keys(resourceCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300
                      ${
                        activeCategory === category
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                  >
                    <div className={`p-1 rounded-md ${activeCategory === category ? 'bg-white/20' : ''}`}>
                      {resourceCategories[category].icon}
                    </div>
                    <span className="hidden sm:inline-block">{resourceCategories[category].label}</span>
                    <span className="sm:hidden">{resourceCategories[category].label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="max-w-2xl text-center">
              <p className="text-muted-foreground text-lg">
                {resourceCategories[activeCategory].description}
              </p>
            </div>
          </section>

          {/* RESOURCES GRID */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {resourceCategories[activeCategory].resources.map(
              (resource, index) => (
                <div
                  key={index}
                  className={mounted ? 'animate-in fade-in slide-in-from-bottom-4' : ''}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ResourceCard {...resource} />
                </div>
              )
            )}
            
            {/* CTA CARD (Matching Height) */}
            <div className="h-full bg-gradient-to-br from-green-500/5 via-primary/5 to-primary/10 border border-green-500/20 rounded-xl p-8 flex flex-col justify-center items-center text-center space-y-6 hover:shadow-xl transition-all duration-300 hover:border-green-500/40 group/cta relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full scale-50 group-hover/cta:scale-100 transition-transform duration-700" />
               
              <div className="relative p-4 bg-background rounded-2xl shadow-sm border border-border group-hover/cta:scale-110 transition-transform duration-300">
                <Sparkles className="text-primary w-8 h-8" />
              </div>
              
              <div className="space-y-2 relative z-10">
                <h3 className="text-xl font-bold text-foreground">Ready to Practice?</h3>
                <p className="text-sm text-muted-foreground">
                  Apply your learning in realistic AI-powered interviews.
                </p>
              </div>
              
              <a
                href="/dashboard"
                className="relative z-10 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-md w-full"
              >
                Start Free Mock Interview
                <ArrowRight className="w-4 h-4" />
              </a>
              
              <div className="pt-4 border-t border-border/50 w-full flex justify-center gap-4 relative z-10">
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">Free</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Forever</span>
                 </div>
                 <div className="w-px h-10 bg-border"></div>
                 <div className="flex flex-col items-center">
                    <span className="font-bold text-lg">Unlimited</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Access</span>
                 </div>
              </div>
            </div>
          </section>

          {/* BOTTOM STATS */}
          <section className="bg-card/50 border border-border/50 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">200+</div>
                <div className="text-sm text-muted-foreground">Free Guides</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground">No Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">25K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
}