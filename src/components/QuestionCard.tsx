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
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto"
      >
        <h2
          className="text-[22px] sm:text-[26px] font-semibold text-[#f5f5f5] mb-2 leading-[1.2]"
          style={{ letterSpacing: "-0.02em" }}
        >
          {text}
        </h2>
        {subtitle && (
          <p className="text-[#8a8f98] text-[15px] mb-7 leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="space-y-2.5">
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
