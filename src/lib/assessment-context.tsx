"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { Branch, Step, BranchResult } from "@/types";
import {
  branchQuestion,
  commonQuestions,
  getQuestionsForBranch,
} from "@/data/questions";
import { getBranchResult } from "@/data/routines";

interface AssessmentState {
  step: Step;
  branch: Branch | null;
  answers: Record<string, string>;
  currentQuestionIndex: number;
}

type AssessmentAction =
  | { type: "START_ASSESSMENT" }
  | { type: "SELECT_BRANCH"; branch: Branch }
  | { type: "ANSWER_QUESTION"; questionId: string; value: string }
  | { type: "NEXT_QUESTION" }
  | { type: "START_LOADING" }
  | { type: "SHOW_RESULT" }
  | { type: "RESET" };

const initialState: AssessmentState = {
  step: "hero",
  branch: null,
  answers: {},
  currentQuestionIndex: 0,
};

function assessmentReducer(
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState {
  switch (action.type) {
    case "START_ASSESSMENT":
      return { ...state, step: "branch-select" };

    case "SELECT_BRANCH":
      return {
        ...state,
        branch: action.branch,
        answers: { ...state.answers, primary_goal: action.branch },
        currentQuestionIndex: 0,
        step: "questions",
      };

    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.value },
      };

    case "NEXT_QUESTION": {
      if (!state.branch) return state;
      const branchQuestions = getQuestionsForBranch(state.branch);
      const totalCommon = commonQuestions.length;
      const totalBranch = branchQuestions.length;
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex >= totalCommon + totalBranch) {
        return { ...state, step: "loading" };
      }

      return { ...state, currentQuestionIndex: nextIndex };
    }

    case "START_LOADING":
      return { ...state, step: "loading" };

    case "SHOW_RESULT":
      return { ...state, step: "result" };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  currentQuestion: {
    id: string;
    text: string;
    subtitle?: string;
    options: { value: string; label: string }[];
  } | null;
  progress: { current: number; total: number };
  result: BranchResult | null;
  handleAnswer: (questionId: string, value: string) => void;
  handleNext: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const currentQuestion = (() => {
    if (state.step === "branch-select") return branchQuestion;
    if (state.step !== "questions" || !state.branch) return null;

    const branchQuestions = getQuestionsForBranch(state.branch);
    const allQuestions = [...commonQuestions, ...branchQuestions];

    if (state.currentQuestionIndex >= allQuestions.length) return null;
    return allQuestions[state.currentQuestionIndex];
  })();

  const progress = (() => {
    if (!state.branch) return { current: 0, total: 0 };
    const total =
      commonQuestions.length + getQuestionsForBranch(state.branch).length;
    return { current: 1 + state.currentQuestionIndex, total: 1 + total };
  })();

  const result: BranchResult | null = state.branch
    ? getBranchResult(state.branch, state.answers)
    : null;

  const handleAnswer = useCallback(
    (questionId: string, value: string) => {
      dispatch({ type: "ANSWER_QUESTION", questionId, value });
    },
    []
  );

  const handleNext = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  return (
    <AssessmentContext.Provider
      value={{
        state,
        dispatch,
        currentQuestion,
        progress,
        result,
        handleAnswer,
        handleNext,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx)
    throw new Error("useAssessment must be used inside AssessmentProvider");
  return ctx;
}
