"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  value: string;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

export function OptionCard({ value, label, selected, onClick }: OptionCardProps) {
  return (
    <motion.button
      onClick={() => onClick(value)}
      whileTap={{ scale: 0.99 }}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl transition-all duration-150 cursor-pointer border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9c5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
        selected
          ? "border-[#4a9c5c] bg-[rgba(74,156,92,0.08)]"
          : "border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[rgba(255,255,255,0.04)]"
      )}
    >
      <div className="flex items-center gap-3.5">
        {/* Selection indicator — left-side dot */}
        <span
          className={cn(
            "w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200",
            selected ? "bg-[#4a9c5c] scale-110" : "bg-[rgba(255,255,255,0.15)]"
          )}
        />
        <span
          className={cn(
            "text-[15px] leading-relaxed font-medium",
            selected ? "text-[#f5f5f5]" : "text-[#8a8f98]"
          )}
        >
          {label}
        </span>
      </div>
    </motion.button>
  );
}
