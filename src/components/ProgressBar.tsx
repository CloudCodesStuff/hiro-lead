"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-[#9ca3af] dark:text-[#6b7280]">
          Step {current} of {total}
        </span>
        <span className="text-xs font-medium text-[#10b981]">{pct}%</span>
      </div>
      <div className="h-1 bg-[#f3f4f6] dark:bg-[#1f1f1f] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#10b981] rounded-full"
          initial={{
            width: `${Math.round(((current - 1) / total) * 100)}%`,
          }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
