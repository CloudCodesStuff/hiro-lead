export type Branch = "hair" | "skin" | "physique";

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  subtitle?: string;
  options: Option[];
}

export interface RoutineItem {
  time: string;
  items: string[];
}

export interface ProfileInsight {
  insight: string;
  answerKeys: string[];
}

export interface BranchResult {
  headline: string;
  copy: string;
  profileSummary: {
    label: string;
    items: ProfileInsight[];
  };
  morningRoutine: RoutineItem;
  eveningRoutine: RoutineItem;
  weeklyHabits: RoutineItem;
  lifestyleSuggestions: string[];
  whyThisFits: string[];
  recommendedProductHandles: string[];
}

export type Step =
  | "hero"
  | "branch-select"
  | "questions"
  | "loading"
  | "result";
