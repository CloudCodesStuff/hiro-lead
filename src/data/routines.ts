import type { Branch, BranchResult, ProfileInsight } from "@/types";

// --- Profile insight builders ---

const scheduleInsights: Record<string, string> = {
  extremely_busy:
    "Your schedule is demanding. The routine below is built for speed - each step takes under 2 minutes so it fits into your day without adding stress.",
  moderately_busy:
    "You have a full schedule but some flexibility. The routine balances effectiveness with efficiency - enough to see results, not so much that it becomes a burden.",
  flexible:
    "You have room to invest in yourself. The routine gives you a solid foundation with room to expand as your habits strengthen.",
};

const consistencyInsights: Record<string, string> = {
  getting_started:
    "You are building new habits. The routine starts simple - one or two steps you can do consistently. Once those stick, everything else becomes easier.",
  somewhat_consistent:
    "You have some consistency but it wavers. The routine focuses on a few core actions that matter most, so missing a day does not derail your progress.",
  very_consistent:
    "You already show strong consistency. The routine builds on that foundation with targeted steps that make the most of habits you already have in place.",
};

const timeInsights: Record<string, string> = {
  "5_min":
    "You have about 5 minutes a day to dedicate. Every step in this routine was selected because it delivers value in a short window.",
  "10_15_min":
    "You can commit 10 to 15 minutes daily. This is enough time for a meaningful routine that covers the essentials without overcomplicating your day.",
  "30_plus_min":
    "You have 30 minutes or more to invest. The routine gives you a thorough system with room to adjust based on how your body responds.",
};

function buildProfileInsights(
  branch: Branch,
  answers: Record<string, string>
): ProfileInsight[] {
  const insights: ProfileInsight[] = [];

  // Schedule insight
  if (answers.schedule && scheduleInsights[answers.schedule]) {
    insights.push({
      insight: scheduleInsights[answers.schedule],
      answerKeys: ["schedule"],
    });
  }

  // Consistency insight
  if (answers.consistency && consistencyInsights[answers.consistency]) {
    insights.push({
      insight: consistencyInsights[answers.consistency],
      answerKeys: ["consistency"],
    });
  }

  // Time availability insight
  if (answers.time_per_day && timeInsights[answers.time_per_day]) {
    insights.push({
      insight: timeInsights[answers.time_per_day],
      answerKeys: ["time_per_day"],
    });
  }

  // Branch-specific challenges
  if (branch === "hair") {
    if (answers.hair_concern === "thinning") {
      insights.push({
        insight:
          "Thinning was your top concern. The routine includes scalp stimulation and gentle handling techniques that support the appearance of fuller hair over time.",
        answerKeys: ["hair_concern"],
      });
    } else if (answers.hair_concern === "dryness") {
      insights.push({
        insight:
          "Dryness is your main focus. The routine emphasizes moisture retention - cold rinses, gentle washing frequency, and deep conditioning - to help your hair hold hydration.",
        answerKeys: ["hair_concern"],
      });
    }
  }

  if (branch === "skin") {
    if (answers.skin_concern === "aging") {
      insights.push({
        insight:
          "Your focus is on aging concerns. The routine prioritizes SPF during the day and repair support at night - the two interventions with the strongest evidence for maintaining healthy-looking skin over time.",
        answerKeys: ["skin_concern"],
      });
    } else if (answers.skin_concern === "dryness") {
      insights.push({
        insight:
          "Dryness is your primary concern. The routine layers hydration - lukewarm cleansing, fast-absorbing morning support, and overnight repair - to help your skin retain moisture throughout the day.",
        answerKeys: ["skin_concern"],
      });
    }
  }

  if (branch === "physique") {
    if (answers.physique_challenge === "consistency") {
      insights.push({
        insight:
          "Consistency is the main gap you identified. The training structure below is designed around the number of days you can actually commit - not an idealized schedule. Showing up matters more than optimizing every session.",
        answerKeys: ["physique_challenge"],
      });
    }
  }

  return insights;
}

// --- Routines ---

interface RoutineData {
  headline: string;
  copy: string;
  morningRoutine: { time: string; items: string[] };
  eveningRoutine: { time: string; items: string[] };
  weeklyHabits: { time: string; items: string[] };
  lifestyleSuggestions: string[];
  whyThisFits: string[];
  recommendedProductHandles: string[];
}

const routineData: Record<Branch, RoutineData> = {
  hair: {
    headline: "Your hair assessment results",
    copy: "Based on your answers, here is what we found and what we recommend.",
    morningRoutine: {
      time: "Morning",
      items: [
        "Gentle scalp massage - 2 minutes to stimulate circulation before your shower",
        "Cold rinse at the end of your shower to seal the hair cuticle",
        "Use a wide-tooth comb on wet hair instead of a brush to reduce breakage",
      ],
    },
    eveningRoutine: {
      time: "Evening",
      items: [
        "Light scalp massage for 1 to 2 minutes before bed to support healthy circulation",
        "Sleep on a silk or satin pillowcase - reduces friction and moisture loss overnight",
        "Avoid tight hairstyles that pull on the scalp",
      ],
    },
    weeklyHabits: {
      time: "Weekly",
      items: [
        "Deep conditioning treatment once a week - look for ingredients like biotin and keratin",
        "Wash 2 to 3 times per week with a gentle sulfate-free shampoo",
        "Take a progress photo to track changes over time - what gets measured improves",
      ],
    },
    lifestyleSuggestions: [
      "Stay hydrated - proper water intake supports overall hair health",
      "Prioritize protein - hair is primarily keratin, a structural protein",
      "Manage stress - chronic stress can affect hair growth cycles",
      "Get 7 to 8 hours of sleep to support the body's repair processes",
    ],
    whyThisFits: [
      "Fits your schedule with quick, actionable steps you can do in 5 minutes",
      "Addresses your core concerns without overwhelming you with steps",
      "Built around consistency, which matches where you are right now",
    ],
    recommendedProductHandles: ["hiro-h01-root"],
  },
  skin: {
    headline: "Your skin assessment results",
    copy: "Based on your answers, here is what we found and what we recommend.",
    morningRoutine: {
      time: "Morning",
      items: [
        "Gentle cleanse with lukewarm water - hot water strips natural oils",
        "Apply H02 Morning Glow to clean, dry skin - let it absorb for 30 seconds",
        "Moisturizer with SPF 30 or higher - UV damage accumulates over decades",
        "Wait a minute between layers so each product can absorb properly",
      ],
    },
    eveningRoutine: {
      time: "Evening",
      items: [
        "Double cleanse to remove the day's buildup - oil-based cleanser first, then water-based",
        "Apply H03 Night Repair to clean, dry skin while your skin's repair cycle is most active",
        "Lock it in with a moisturizer suited to your skin type",
        "Silk pillowcase helps products stay on your skin instead of your pillow",
      ],
    },
    weeklyHabits: {
      time: "Weekly",
      items: [
        "Gentle exfoliation once a week - more is not better here",
        "Assess your skin's condition and adjust products if needed",
        "Clean your pillowcases, phone screen, and anything else that touches your face",
      ],
    },
    lifestyleSuggestions: [
      "Drink water throughout the day - dehydration shows on your skin first",
      "Limit alcohol - a major contributor to skin inflammation and puffiness",
      "Get consistent sleep - your skin repairs itself while you rest",
      "Sun protection is the single highest-impact habit for long-term skin health",
    ],
    whyThisFits: [
      "Matches the time you are willing to commit each day",
      "Addresses your main concerns without unnecessary steps",
      "Designed to be consistent, which is where routines either work or fail",
    ],
    recommendedProductHandles: ["hiro-h02-glow", "hiro-h03-restore"],
  },
  physique: {
    headline: "Your fitness assessment results",
    copy: "Based on your answers, here is what we found and what we recommend.",
    morningRoutine: {
      time: "Training Structure",
      items: [
        "Start each session with 5 minutes of mobility work - active movement prep, not passive stretching",
        "Focus on compound movements: squats, presses, pulls, and carries. They deliver the most value per minute spent",
        "Train 3 to 4 days per week. Full-body or upper/lower split depending on your schedule",
        "Finish with 10 minutes of brisk walking or light conditioning for recovery",
      ],
    },
    eveningRoutine: {
      time: "Recovery",
      items: [
        "Prioritize sleep - this is when muscle repair and hormonal recovery happen",
        "Maintain a consistent bedtime - circadian rhythm affects performance more than most people realize",
        "Light stretching or foam rolling if you feel stiff, but do not force it",
      ],
    },
    weeklyHabits: {
      time: "Consistency Framework",
      items: [
        "Track your workouts. Write down what you did, how it felt. Data over motivation",
        "Aim for 8,000 to 10,000 steps on non-training days to stay active without adding fatigue",
        "Protein at every meal, vegetables at most meals. Simple, repeatable, effective",
        "At least one full rest day. Recovery is not optional - it is where progress actually occurs",
      ],
    },
    lifestyleSuggestions: [
      "Protein target: 1.6 to 2.0 grams per kilogram of bodyweight",
      "Sleep: 7 to 8 hours minimum. Body composition goals are undermined by poor sleep",
      "Hydration: 2 to 3 liters of water daily, more on training days",
      "Stress management: chronically elevated cortisol works directly against muscle growth and fat loss",
    ],
    whyThisFits: [
      "Built for the number of days per week you can actually commit",
      "Matches your experience level - no advanced techniques without the foundation",
      "Prioritizes consistency and recovery over intensity, which is where most people fail",
    ],
    recommendedProductHandles: [],
  },
};

// --- Public API ---

export function getBranchResult(
  branch: Branch,
  answers: Record<string, string>
): BranchResult {
  const data = routineData[branch];

  return {
    headline: data.headline,
    copy: data.copy,
    profileSummary: {
      label: "Your current profile",
      items: buildProfileInsights(branch, answers),
    },
    morningRoutine: data.morningRoutine,
    eveningRoutine: data.eveningRoutine,
    weeklyHabits: data.weeklyHabits,
    lifestyleSuggestions: data.lifestyleSuggestions,
    whyThisFits: data.whyThisFits,
    recommendedProductHandles: data.recommendedProductHandles,
  };
}

