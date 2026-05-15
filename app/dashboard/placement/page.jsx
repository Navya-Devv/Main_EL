"use client";

import React, { useState } from "react";
import { TrendingUp, Award, BookOpen, BrainCircuit, Server, ArrowRight, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PlacementPredictor() {
  const [formData, setFormData] = useState({
    cgpa: "",
    internships: "",
    projects: "",
    workshops: "",
    aptitudeScore: "",
    softSkills: "",
    sscMarks: "",
    hscMarks: "",
    extracurricular: "0",
    placementTraining: "0"
  });
  
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState(""); // Stores the dynamic suggestion
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // ---------------------------------------------------------
  // 🧠 INTELLIGENT FEEDBACK LOGIC
  // ---------------------------------------------------------
  const generateFeedback = (score) => {
    if (score > 80) return "Your profile is outstanding! You are ready for top-tier companies.";
    
    // Check for specific weaknesses
    if (parseInt(formData.internships) === 0) return "⚠️ Critical: You have 0 Internships. Prioritize getting at least one live industry experience.";
    if (parseFloat(formData.cgpa) < 7.0) return "⚠️ Academic Alert: Try to push your CGPA above 7.0 to clear company cutoffs.";
    if (parseInt(formData.projects) < 2) return "💡 Tip: Build 1 more full-stack 'Capstone Project' to discuss in interviews.";
    if (parseFloat(formData.aptitudeScore) < 60) return "📉 Aptitude Weakness: Practice Quants and Logical Reasoning daily.";
    if (parseFloat(formData.softSkills) < 3) return "🗣️ Communication: Your soft skills score is low. Work on mock interviews.";
    
    return "You are on the right track! Adding one more certification could be the tie-breaker.";
  };

  const calculateProbability = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    setFeedback("");

    try {
      const backendUrl = 'https://main-el-t5dp.onrender.com';
      const response = await fetch(`${backendUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to connect to Python Backend.");

      const data = await response.json();
      const probability = data.probability;
      
      setResult(probability);
      setFeedback(generateFeedback(probability)); // Generate advice based on inputs + score
      
    } catch (err) {
      console.error("API Error:", err);
      setError("Could not connect to the Model. Is 'app.py' running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Server className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Placement Probability Predictor</h1>
          <p className="text-muted-foreground">
            Advanced AI Analysis • Random Forest v3.1
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* INPUT FORM */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader><CardTitle>Candidate Profile</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>CGPA (0-10)</Label>
                <Input name="cgpa" type="number" step="0.1" placeholder="8.5" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>10th Marks (%)</Label>
                <Input name="sscMarks" type="number" placeholder="85" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>12th Marks (%)</Label>
                <Input name="hscMarks" type="number" placeholder="82" onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                <Label>Aptitude Score (0-100)</Label>
                <Input name="aptitudeScore" type="number" placeholder="85" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Soft Skills (0-5)</Label>
                <Input name="softSkills" type="number" step="0.1" max="5" placeholder="4.5" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Workshops/Certifications</Label>
                <Input name="workshops" type="number" placeholder="2" onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Internships</Label>
                <Input name="internships" type="number" placeholder="1" onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Projects</Label>
                <Input name="projects" type="number" placeholder="2" onChange={handleInputChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <Label>Extracurricular Activities</Label>
                 <Select onValueChange={(val) => handleSelectChange("extracurricular", val)}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="space-y-2">
                 <Label>Placement Training</Label>
                 <Select onValueChange={(val) => handleSelectChange("placementTraining", val)}>
                    <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Yes</SelectItem>
                      <SelectItem value="0">No</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
            </div>

            <Button onClick={calculateProbability} disabled={loading} className="w-full mt-4 h-12 text-lg">
              {loading ? "AI is Analyzing..." : <span className="flex items-center gap-2">Predict My Chance <ArrowRight size={18}/></span>}
            </Button>
            
            {error && <div className="text-red-500 text-sm flex items-center gap-2 mt-2"><AlertTriangle size={16}/> {error}</div>}
          </CardContent>
        </Card>

        {/* RESULTS PANEL */}
        <Card className="flex flex-col justify-center items-center text-center p-6 bg-slate-50 dark:bg-slate-900/50 shadow-md border-t-4 border-t-primary">
          {result !== null ? (
            <div className="space-y-6 animate-in fade-in zoom-in duration-500 w-full">
              
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle className="text-slate-200 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                  <circle 
                    className={`stroke-current ${result > 75 ? 'text-green-500' : result > 40 ? 'text-yellow-500' : 'text-red-500'}`} 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    strokeDasharray={`${Math.round(result) * 2.51} 251`} 
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold">{Math.round(result)}%</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Chance</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`p-3 rounded-lg border ${result > 75 ? 'bg-green-50 border-green-200 text-green-700' : result > 40 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                  <h3 className="text-xl font-bold">
                    {result > 75 ? "Excellent Profile" : result > 40 ? "Average Profile" : "High Risk"}
                  </h3>
                </div>
                
                {/* DYNAMIC FEEDBACK SECTION */}
                <div className="text-left bg-white dark:bg-slate-800 p-4 rounded-lg border shadow-sm">
                   <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                     <Lightbulb className="w-4 h-4 text-yellow-500" /> AI Recommendation:
                   </h4>
                   <p className="text-sm text-slate-600 dark:text-slate-300">
                     {feedback}
                   </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-muted-foreground opacity-50 space-y-4 py-10">
              <BrainCircuit size={80} className="mx-auto text-slate-300" />
              <div className="space-y-2">
                <p className="font-medium text-lg">AI Prediction Engine</p>
                <p className="text-sm max-w-[200px] mx-auto">Fill in all details to generate your placement report.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}