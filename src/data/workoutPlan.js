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
          { id: "e1", name: "Pushups", sets: 3, reps: "12", videoUrl: "" },
          { id: "e2", name: "Pull-ups", sets: 3, reps: "8", videoUrl: "" },
          { id: "e3", name: "Dips", sets: 3, reps: "12", videoUrl: "" },
          { id: "e4", name: "Squats", sets: 3, reps: "20", videoUrl: "" },
          { id: "e5", name: "Lunges", sets: 3, reps: "15/leg", videoUrl: "" },
          { id: "e6", name: "Plank", sets: 3, reps: "60 sec", videoUrl: "" }
        ],
        cooldown: { name: "Cool down", duration: "10 Min", videoUrl: "" }
      }
    }
  };