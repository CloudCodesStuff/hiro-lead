"use client";

import { motion, AnimatePresence } from "framer-motion";
import { OptionCard } from "./OptionCard";

interface QuestionCardProps {
  questionId: string;
  text: string;
  subtitle?: string;
  options: { value: string; label: string }[];
  selectedValue: string | null;
  onSelect: (questionId: string, value: string) => void;
}

export function QuestionCard({
  questionId,
  text,
  subtitle,
  options,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionId}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-lg mx-auto"
      >
        <h2 className="text-[22px] sm:text-2xl font-semibold text-[#111] dark:text-white mb-2 leading-tight">
          {text}
        </h2>
        {subtitle && (
          <p className="text-[#6b7280] dark:text-[#9ca3af] text-[15px] mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="space-y-3">
          {options.map((opt) => (
            <OptionCard
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={selectedValue === opt.value}
              onClick={(val) => onSelect(questionId, val)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
