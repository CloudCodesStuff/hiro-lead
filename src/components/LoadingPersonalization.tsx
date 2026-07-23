"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const messages = [
  "Analyzing your goals...",
  "Understanding your routine...",
  "Creating your HIRO recommendation...",
  "Your report is ready.",
];

export function LoadingPersonalization() {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    if (current < messages.length) {
      setCurrent((c) => c + 1);
    }
  }, [current]);

  useEffect(() => {
    if (current >= messages.length) return;
    const t = setTimeout(advance, 900);
    return () => clearTimeout(t);
  }, [current, advance]);

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {current < messages.length && (
        <motion.div
          className="w-7 h-7 border-2 border-[#e5e7eb] dark:border-[#2a2a2a] border-t-[#10b981] rounded-full mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
        />
      )}

      {current >= messages.length && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="w-11 h-11 rounded-full bg-[#d1fae5] dark:bg-[#10b981]/20 flex items-center justify-center mb-8"
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

      <div className="space-y-2 text-center">
        {messages.map((msg, i) =>
          i < current ? (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-[#555] dark:text-[#a0a0a0] text-[15px]"
            >
              {msg}
            </motion.p>
          ) : null
        )}
      </div>
    </div>
  );
}
