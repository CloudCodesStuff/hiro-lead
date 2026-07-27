"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Branch } from "@/types";

interface LoadingPersonalizationProps {
  branch: Branch | null;
  answers: Record<string, string>;
}

function getMessages(branch: Branch | null, answers: Record<string, string>): string[] {
  const concern =
    answers.hair_concern || answers.skin_concern || answers.physique_challenge;

  const branchLabel =
    branch === "hair"
      ? "hair protocol"
      : branch === "skin"
      ? "skin protocol"
      : "protocol";

  const concernLine = concern
    ? `Factoring in your ${concern.replace(/_/g, " ")} concern...`
    : "Reviewing your answers...";

  const scheduleLabel =
    answers.schedule === "extremely_busy"
      ? "a minimal"
      : answers.schedule === "moderately_busy"
      ? "a balanced"
      : "a thorough";

  return [
    `Building your ${branchLabel}...`,
    concernLine,
    `Matching ${scheduleLabel} routine to your schedule...`,
    "Your results are ready.",
  ];
}

export function LoadingPersonalization({ branch, answers }: LoadingPersonalizationProps) {
  const messages = getMessages(branch, answers);
  const [visibleCount, setVisibleCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (visibleCount >= messages.length - 1) {
      const t = setTimeout(() => setDone(true), 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 400 : 900
    );
    return () => clearTimeout(t);
  }, [visibleCount, messages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 w-full max-w-sm mx-auto">
      {/* Indicator */}
      <div className="mb-10 relative w-12 h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 border-2 border-[#e5e7eb] dark:border-[#2a2a2a] border-t-[#10b981] rounded-full"
              style={{ animation: "spin 0.8s linear infinite" }}
            />
          ) : (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="w-10 h-10 rounded-full bg-[#d1fae5] dark:bg-[#10b981]/15 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-[#10b981]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Steps */}
      <div className="w-full space-y-3">
        {messages.map((msg, i) => {
          const visible = i <= visibleCount;
          const isLast = i === messages.length - 1;
          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-3"
                >
                  {/* Step dot */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isLast && done
                        ? "bg-[#10b981]"
                        : i < visibleCount
                        ? "bg-[#10b981]"
                        : "bg-[#d1d5db] dark:bg-[#3a3a3a]"
                    }`}
                  />
                  <p
                    className={`text-[15px] leading-snug transition-colors duration-300 ${
                      i < visibleCount || (isLast && done)
                        ? "text-[#111] dark:text-white font-medium"
                        : "text-[#9ca3af] dark:text-[#6b7280]"
                    }`}
                  >
                    {msg}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
