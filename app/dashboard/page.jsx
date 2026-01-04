"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import {
  Bot,
  Plus,
  ListChecks,
  Trophy,
  Zap,
  TrendingUp,
} from "lucide-react";

import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

function Dashboard() {
  const { user } = useUser();
  const [interviewData, setInterviewData] = useState([]);
  const [isNewInterviewModalOpen, setIsNewInterviewModalOpen] = useState(false);

  const [statsCards, setStatsCards] = useState([
    {
      icon: <ListChecks size={28} className="text-primary" />,
      title: "Total Interviews",
      value: "0",
    },
    {
      icon: <Trophy size={28} className="text-primary" />,
      title: "Best Score",
      value: "N/A",
    },
    {
      icon: <TrendingUp size={28} className="text-primary" />,
      title: "Improvement Rate",
      value: "0%",
    },
  ]);

  const fetchInterviews = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      toast.error("User email not found");
      return;
    }

    try {
      const response = await fetch("/api/fetchUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.primaryEmailAddress.emailAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch interview data");
      }

      const data = await response.json();

      const userSpecificInterviews = data.userAnswers.filter(
        (interview) =>
          interview.userEmail === user.primaryEmailAddress.emailAddress
      );

      setInterviewData(userSpecificInterviews);

      const totalInterviews = userSpecificInterviews.length;
      const bestScore =
        totalInterviews > 0
          ? Math.max(
              ...userSpecificInterviews.map((item) =>
                parseInt(item.rating || "0")
              )
            )
          : 0;

      const improvementRate = calculateImprovementRate(userSpecificInterviews);

      setStatsCards((prev) => [
        { ...prev[0], value: totalInterviews.toString() },
        { ...prev[1], value: bestScore ? `${bestScore}/10` : "N/A" },
        { ...prev[2], value: `${improvementRate}%` },
      ]);

      if (totalInterviews > 0) {
        toast.success(`Loaded ${totalInterviews} interview(s)`);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      toast.error(error.message || "Failed to fetch interviews");
    }
  };

  const calculateImprovementRate = (interviews) => {
    if (interviews.length <= 1) return 0;

    const scores = interviews
      .map((interview) => parseInt(interview.rating || "0"))
      .sort((a, b) => a - b);

    if (scores[0] === 0) return 0;

    const improvement =
      ((scores[scores.length - 1] - scores[0]) / scores[0]) * 100;

    return Math.round(improvement);
  };

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      fetchInterviews();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Bot className="text-primary" size={32} />
            Lakshya AI Dashboard
          </h2>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.firstName || "Candidate"}
          </p>
        </div>

        <div className="text-sm text-muted-foreground">
          {user?.primaryEmailAddress?.emailAddress}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-accent p-3 rounded-lg">{card.icon}</div>
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-semibold text-card-foreground">
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Create Interview */}
      <div className="bg-card border border-border rounded-xl p-6 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground flex items-center gap-2">
            <Zap className="text-primary" size={22} />
            Create AI Mock Interview
          </h3>

          <button
            onClick={() => setIsNewInterviewModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
          >
            <Plus size={18} />
            New Interview
          </button>
        </div>

        <AddNewInterview
          isOpen={isNewInterviewModalOpen}
          onClose={() => setIsNewInterviewModalOpen(false)}
        />
      </div>

      {/* Interview History */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-6">
          Interview History
        </h3>
        <InterviewList interviews={interviewData} />
      </div>
    </div>
  );
}

export default Dashboard;
