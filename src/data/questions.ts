import type { Branch, Question } from "@/types";

export const branchQuestion: Question = {
  id: "primary_goal",
  text: "What would you like to improve most?",
  subtitle:
    "Choose the area you want to focus on. Your answers shape the routine we recommend.",
  options: [
    {
      value: "hair",
      label: "Hair - Improve the appearance and health of your hair",
    },
    {
      value: "skin",
      label: "Skin - Create a simple skincare routine for your goals",
    },
    {
      value: "physique",
      label: "Physique - Build a sustainable fitness routine around your lifestyle",
    },
  ],
};

export const commonQuestions: Question[] = [
  {
    id: "schedule",
    text: "How would you describe your current schedule?",
    options: [
      { value: "extremely_busy", label: "Extremely busy" },
      { value: "moderately_busy", label: "Moderately busy" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    id: "time_per_day",
    text: "How much time can you realistically dedicate each day?",
    options: [
      { value: "5_min", label: "5 minutes" },
      { value: "10_15_min", label: "10 to 15 minutes" },
      { value: "30_plus_min", label: "30 minutes or more" },
    ],
  },
  {
    id: "consistency",
    text: "How consistent are your current habits?",
    options: [
      { value: "getting_started", label: "Getting started" },
      { value: "somewhat_consistent", label: "Somewhat consistent" },
      { value: "very_consistent", label: "Very consistent" },
    ],
  },
];

export const hairQuestions: Question[] = [
  {
    id: "hair_concern",
    text: "What is your biggest hair concern?",
    options: [
      { value: "thinning", label: "Thinning" },
      { value: "dryness", label: "Dryness" },
      { value: "volume", label: "Lack of volume" },
      { value: "overall_health", label: "Overall hair health" },
    ],
  },
  {
    id: "hair_routine",
    text: "How would you describe your current hair routine?",
    options: [
      { value: "minimal", label: "Basic - shampoo and conditioner" },
      { value: "some_products", label: "A few products, no real structure" },
      {
        value: "established",
        label: "Established routine, looking to improve",
      },
    ],
  },
  {
    id: "hair_frequency",
    text: "How often do you currently care for your hair?",
    options: [
      { value: "1_2_per_week", label: "1 to 2 times per week" },
      { value: "3_4_per_week", label: "3 to 4 times per week" },
      { value: "daily", label: "Daily" },
    ],
  },
  {
    id: "hair_time",
    text: "How much time would you realistically spend improving your hair routine?",
    options: [
      { value: "5_min", label: "About 5 minutes a day" },
      { value: "10_15_min", label: "10 to 15 minutes a day" },
      { value: "20_plus_min", label: "20 minutes or more a day" },
    ],
  },
  {
    id: "hair_success",
    text: "What would success look like for you?",
    options: [
      { value: "confidence", label: "Feeling confident about my hair" },
      {
        value: "visible_improvement",
        label: "Seeing visible improvement over time",
      },
      { value: "less_worry", label: "Worrying less about hair loss" },
      {
        value: "healthy_routine",
        label: "Having a routine I can actually stick to",
      },
    ],
  },
  {
    id: "hair_goals",
    text: "What matters most to you right now?",
    options: [
      { value: "prevention", label: "Preventing further thinning" },
      { value: "regrowth", label: "Supporting regrowth" },
      { value: "health_shine", label: "Healthier, shinier hair" },
      { value: "simplicity", label: "A simple system that works" },
    ],
  },
];

export const skinQuestions: Question[] = [
  {
    id: "skin_concern",
    text: "What is your biggest skin concern?",
    options: [
      { value: "dryness", label: "Dryness" },
      { value: "uneven", label: "Uneven appearance" },
      { value: "texture", label: "Texture" },
      { value: "aging", label: "Aging concerns" },
      {
        value: "maintaining",
        label: "Maintaining healthy-looking skin",
      },
    ],
  },
  {
    id: "skin_routine",
    text: "How would you describe your current skincare routine?",
    options: [
      { value: "none", label: "I do not have one yet" },
      { value: "basic", label: "Basic - cleanser and moisturizer" },
      {
        value: "multi_step",
        label: "A few steps but not consistent",
      },
      { value: "consistent", label: "Consistent routine" },
    ],
  },
  {
    id: "skin_time",
    text: "How much time do you want your routine to take?",
    options: [
      { value: "under_5_min", label: "Under 5 minutes" },
      { value: "5_10_min", label: "5 to 10 minutes" },
      { value: "10_20_min", label: "10 to 20 minutes" },
    ],
  },
  {
    id: "skin_products",
    text: "What products do you currently use?",
    options: [
      { value: "basic_cleanser", label: "Basic cleanser only" },
      {
        value: "cleanser_moisturizer",
        label: "Cleanser and moisturizer",
      },
      {
        value: "multiple_products",
        label: "Multiple products - serums, moisturizers",
      },
      { value: "prescription", label: "Prescription or clinical products" },
    ],
  },
  {
    id: "skin_challenge",
    text: "What is your biggest challenge with skincare?",
    options: [
      { value: "consistency", label: "Staying consistent" },
      {
        value: "knowing_what",
        label: "Not knowing what to use",
      },
      { value: "time", label: "Not enough time" },
      { value: "results", label: "Not seeing results" },
    ],
  },
  {
    id: "skin_goals",
    text: "What matters most to you right now?",
    options: [
      { value: "simplicity", label: "A simple routine I can follow" },
      {
        value: "visible_results",
        label: "Visible improvement in my skin",
      },
      { value: "prevention", label: "Preventing future concerns" },
      { value: "confidence", label: "Feeling confident without relying on makeup" },
    ],
  },
];

export const physiqueQuestions: Question[] = [
  {
    id: "physique_goal",
    text: "What is your main fitness goal?",
    options: [
      { value: "build_muscle", label: "Build muscle" },
      { value: "lose_fat", label: "Lose fat" },
      { value: "improve_energy", label: "Improve energy" },
      { value: "stay_consistent", label: "Stay consistent" },
    ],
  },
  {
    id: "physique_days",
    text: "How many days per week can you train?",
    options: [
      { value: "1_2", label: "1 to 2 days" },
      { value: "3_4", label: "3 to 4 days" },
      { value: "5_plus", label: "5 or more days" },
    ],
  },
  {
    id: "physique_experience",
    text: "What is your current fitness experience?",
    options: [
      { value: "beginner", label: "Just getting started" },
      { value: "intermediate", label: "Some experience, inconsistent" },
      { value: "experienced", label: "Experienced, looking to optimize" },
    ],
  },
  {
    id: "physique_challenge",
    text: "What is your biggest challenge with fitness?",
    options: [
      { value: "time", label: "Time" },
      { value: "motivation", label: "Motivation" },
      { value: "consistency", label: "Consistency" },
      { value: "knowing_what", label: "Knowing what to do" },
    ],
  },
  {
    id: "physique_time",
    text: "How much time per session can you commit?",
    options: [
      { value: "20_30_min", label: "20 to 30 minutes" },
      { value: "45_60_min", label: "45 to 60 minutes" },
      { value: "60_plus_min", label: "60 minutes or more" },
    ],
  },
  {
    id: "physique_environment",
    text: "Where do you prefer to train?",
    options: [
      { value: "home", label: "At home" },
      { value: "gym", label: "At a gym" },
      { value: "outdoor", label: "Outdoors" },
      { value: "mix", label: "A mix - whatever works that day" },
    ],
  },
];

export function getQuestionsForBranch(branch: Branch): Question[] {
  switch (branch) {
    case "hair":
      return hairQuestions;
    case "skin":
      return skinQuestions;
    case "physique":
      return physiqueQuestions;
  }
}

export function getTotalSteps(branch: Branch): number {
  return commonQuestions.length + getQuestionsForBranch(branch).length + 1;
}
