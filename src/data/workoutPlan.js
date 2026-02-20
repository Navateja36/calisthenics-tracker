// src/data/workoutPlan.js

export const workoutPlan = {
    month1: {
      id: "m1",
      title: "Building Foundation",
      weeks: "Week 1-4",
      daysInBlock: 28,             // 100% = working out all 28 days
      minimumTargetSessions: 12,   // Beginner goal: 3 times/week * 4 weeks
      routine: {
        warmup: { name: "Warmup", duration: "5-10 Min", notes: "Light cardio / Jumping jacks", videoUrl: "" },
        exercises: [
          { id: "e1", name: "Pushups", sets: 3, reps: "12", videoId: "IODxDxX7oi4" },
          { id: "e2", name: "Pull-ups", sets: 3, reps: "8", videoId: "eGo4IYtlpEM" },
          { id: "e3", name: "Dips", sets: 3, reps: "12", videoId: "2z8JmcrW-As" },
          { id: "e4", name: "Squats", sets: 3, reps: "20", videoId: "gcNh17Ckjgg" },
          { id: "e5", name: "Lunges", sets: 3, reps: "15/leg", videoId: "QOVaHwm-Q6U" },
          { id: "e6", name: "Plank", sets: 3, reps: "60 sec", videoId: "pSHjTRCQxIw" }
        ],
        cooldown: { name: "Cool down", duration: "10 Min", videoUrl: "" }
      }
    }
  };