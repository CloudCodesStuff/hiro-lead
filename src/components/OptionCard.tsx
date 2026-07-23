"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  value: string;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

export function OptionCard({
  value,
  label,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <motion.button
      onClick={() => onClick(value)}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]",
        selected
          ? "border-[#10b981] bg-[#d1fae5]/30 dark:bg-[#10b981]/10"
          : "border-[#e5e7eb] dark:border-[#2a2a2a] bg-white dark:bg-[#111] hover:border-[#d1d5db] dark:hover:border-[#3a3a3a]"
      )}
      whileTap={{ scale: 0.985 }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={cn(
            "mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors",
            selected
              ? "border-[#10b981] bg-[#10b981]"
              : "border-[#d1d5db] dark:border-[#3a3a3a]"
          )}
        >
          {selected && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </div>
        <span
          className={cn(
            "text-[15px] leading-relaxed",
            selected
              ? "text-[#111] dark:text-white font-medium"
              : "text-[#555] dark:text-[#a0a0a0]"
          )}
        >
          {label}
        </span>
      </div>
    </motion.button>
  );
}
