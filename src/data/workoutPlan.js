export const workoutPlan = {
  month1: {
    id: "m1",
    title: "Building Foundation",
    weeks: "Week 1-4",
    daysInBlock: 28,
    minimumTargetSessions: 12,
    type: "full_body",
    routine: {
      warmup: { duration: "5-10 Min", notes: "Light cardio / Jumping jacks" },
      exercises: [
        { id: "e1", name: "Pushups", sets: 3, reps: "12", videoId: "IODxDxX7oi4" },
        { id: "e2", name: "Pull-ups", sets: 3, reps: "8", videoId: "eGo4IYtlpEM" },
        { id: "e3", name: "Dips", sets: 3, reps: "12", videoId: "2z8JmcrW-As" },
        { id: "e4", name: "Squats", sets: 3, reps: "20", videoId: "gcNh17Ckjgg" },
        { id: "e5", name: "Lunges", sets: 3, reps: "15/leg", videoId: "QOVaHwm-Q6U" },
        { id: "e6", name: "Plank", sets: 3, reps: "60 sec", videoId: "pSHjTRCQxIw" }
      ],
      cooldown: { duration: "10 Min" }
    }
  },
  
  month2: {
    id: "m2",
    title: "Increasing Intensity & Skill",
    weeks: "Week 5-8",
    daysInBlock: 28,
    minimumTargetSessions: 16,
    type: "split",
    routines: {
      upper: {
        name: "Upper Body",
        warmup: { duration: "10 Min", notes: "Dynamic stretches" },
        exercises: [
          { id: "m2u1", name: "Pushups", sets: 4, reps: "15", videoId: "IODxDxX7oi4" },
          { id: "m2u2", name: "Pull-ups", sets: 4, reps: "10", videoId: "eGo4IYtlpEM" },
          { id: "m2u3", name: "Dips", sets: 4, reps: "15", videoId: "2z8JmcrW-As" },
          { id: "m2u4", name: "Pike Push-ups", sets: 3, reps: "12", videoId: "sposDXWEB0A" },
          { id: "m2u5", name: "Plank to Push-up", sets: 3, reps: "15", videoId: "gTQXB2D3H1o" }
        ],
        cooldown: { duration: "10 Min" }
      },
      lower: {
        name: "Lower Body & Core",
        warmup: { duration: "10 Min", notes: "Dynamic stretches" },
        exercises: [
          { id: "m2l1", name: "Squats", sets: 4, reps: "25", videoId: "gcNh17Ckjgg" },
          { id: "m2l2", name: "Lunges", sets: 4, reps: "20/leg", videoId: "QOVaHwm-Q6U" },
          { id: "m2l3", name: "Glute Bridges", sets: 3, reps: "25", videoId: "8bbE64NuDTU" },
          { id: "m2l4", name: "Calf Raises", sets: 3, reps: "25", videoId: "-M4-G8p8fmc" },
          { id: "m2l5", name: "Hanging Leg Raises", sets: 3, reps: "12 (use bar)", videoId: "Pr1ieGZ5atk" },
          { id: "m2l6", name: "Russian Twists", sets: 3, reps: "20/side", videoId: "wkD8rjkodUI" }
        ],
        cooldown: { duration: "10 Min" }
      }
    }
  },

  // NEW: Month 3 Push/Pull/Legs Split
  month3: {
    id: "m3",
    title: "Mastery & Hypertrophy",
    weeks: "Week 9-12",
    daysInBlock: 28,
    minimumTargetSessions: 20, // 5 days a week target
    type: "split",
    routines: {
      push: {
        name: "Advanced Push",
        warmup: { duration: "10 Min", notes: "Wrist & Shoulder Mobility" },
        exercises: [
          { id: "m3p1", name: "Wall Handstand Pushups", sets: 4, reps: "6-8", videoId: "hwkiJntX8Zg" },
          { id: "m3p2", name: "Advanced Dips", sets: 4, reps: "12-15", videoId: "2z8JmcrW-As" },
          { id: "m3p3", name: "Pseudo Planche Pushups", sets: 3, reps: "10", videoId: "7xXW8J6C3e0" },
          { id: "m3p4", name: "Triceps Extensions (Bodyweight)", sets: 3, reps: "12", videoId: "gTQXB2D3H1o" }
        ],
        cooldown: { duration: "10 Min" }
      },
      pull: {
        name: "Advanced Pull",
        warmup: { duration: "10 Min", notes: "Scapula pull-ups & hangs" },
        exercises: [
          { id: "m3pl1", name: "Archer Pull-ups", sets: 4, reps: "6/side", videoId: "X_lE4r-JbZc" },
          { id: "m3pl2", name: "Muscle-up Negatives", sets: 4, reps: "5", videoId: "X-QxU-HnmbI" },
          { id: "m3pl3", name: "Front Lever Tucks", sets: 3, reps: "15 sec hold", videoId: "vA_IqZ7F0_c" },
          { id: "m3pl4", name: "Chin-ups", sets: 3, reps: "Max", videoId: "eGo4IYtlpEM" }
        ],
        cooldown: { duration: "10 Min" }
      },
      legs: {
        name: "Legs & Core",
        warmup: { duration: "10 Min", notes: "Dynamic stretches & deep squats" },
        exercises: [
          { id: "m3l1", name: "Pistol Squats", sets: 4, reps: "8/leg", videoId: "vq5-cdjihcg" },
          { id: "m3l2", name: "Shrimp Squats", sets: 3, reps: "8/leg", videoId: "gcNh17Ckjgg" },
          { id: "m3l3", name: "Dragon Flags", sets: 4, reps: "8", videoId: "wkD8rjkodUI" },
          { id: "m3l4", name: "L-Sit Hold", sets: 4, reps: "15 sec", videoId: "Pr1ieGZ5atk" }
        ],
        cooldown: { duration: "10 Min" }
      }
    }
  }
};