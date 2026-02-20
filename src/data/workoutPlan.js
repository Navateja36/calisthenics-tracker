export const workoutPlan = {
  month1: {
    id: "m1",
    title: "Building Foundation",
    weeks: "Week 1-4 (full body workout)",
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
    title: "Increasing Intensity & Skill Introduction",
    weeks: "Week 5-8 (Split)",
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

  // NEW: Month 3 based on your handwritten notes!
  month3: {
    id: "m3",
    title: "Skill Focus & Advanced",
    weeks: "Week 9-12",
    daysInBlock: 28,
    minimumTargetSessions: 18, // 4 to 5 times a week
    type: "split",
    routines: {
      upper: {
        name: "Upper Body",
        warmup: { duration: "5-10 Min", notes: "Wrist mobility & light cardio" },
        exercises: [
          { id: "m3u1", name: "Decline Push-ups", sets: 4, reps: "15", videoId: "ZtMdEOnUeaQ" },
          { id: "m3u2", name: "Pull-ups", sets: 4, reps: "12", videoId: "eGo4IYtlpEM" },
          { id: "m3u3", name: "Dips", sets: 4, reps: "15", videoId: "2z8JmcrW-As" },
          { id: "m3u4", name: "Archer Push-ups", sets: 3, reps: "10/side", videoId: "KtwXhQmnMQA" },
          { id: "m3u5", name: "Plank to Push-ups", sets: 3, reps: "20", videoId: "gTQXB2D3H1o" }
        ],
        cooldown: { duration: "5 Min" }
      },
      lower: {
        name: "Lower Body & Core",
        warmup: { duration: "10 Min", notes: "Dynamic stretches" },
        exercises: [
          { id: "m3l1", name: "Pistol Squats (Assisted)", sets: 4, reps: "10/leg", videoId: "vq5-cdjihcg" },
          { id: "m3l2", name: "Bulgarian Split Squats", sets: 4, reps: "15/leg", videoId: "2C-uNgKwPLE" },
          { id: "m3l3", name: "Single-Leg Glute Bridges", sets: 3, reps: "20/leg", videoId: "_uEos2b1wE0" },
          { id: "m3l4", name: "Calf Raises", sets: 3, reps: "30", videoId: "-M4-G8p8fmc" },
          { id: "m3l5", name: "Hanging Leg Raises", sets: 3, reps: "15", videoId: "Pr1ieGZ5atk" },
          { id: "m3l6", name: "Windshield Wipers", sets: 3, reps: "15/side", videoId: "0Z6qJg35cEE" }
        ],
        cooldown: { duration: "5 Min" }
      },
      skills: {
        name: "Skill Training",
        warmup: { duration: "5 Min", notes: "Wrist & Shoulder prep" },
        exercises: [
          { id: "m3s1", name: "Wall-assisted Handstand", sets: 3, reps: "30 sec hold", videoId: "hwkiJntX8Zg" },
          { id: "m3s2", name: "L-sit Progression (Tuck Sits)", sets: 3, reps: "15-20 sec hold", videoId: "IUZJoSP66HI" },
          { id: "m3s3", name: "Muscle-up Progressions (Jumping/Band)", sets: 3, reps: "5", videoId: "X-QxU-HnmbI" }
        ],
        cooldown: { duration: "5 Min" }
      }
    }
  }
};