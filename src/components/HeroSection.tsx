"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-xl"
      >
        {/* Logo */}
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hiro-logo.png"
            alt="HIRO Protocol"
            className="h-6 sm:h-7 mx-auto dark:invert"
          />
        </div>

        <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-[#111] dark:text-white leading-[1.12] mb-5 tracking-[-0.02em]">
          Your personalized HIRO routine
        </h1>

        <p className="text-base sm:text-lg text-[#6b7280] dark:text-[#9ca3af] leading-relaxed mb-7 max-w-md mx-auto">
          Answer a few questions about your lifestyle, goals, and challenges.
          We will create a routine designed around your needs.
        </p>

        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-3.5 rounded-xl bg-[#10b981] text-white font-medium text-base hover:bg-[#059669] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]"
        >
          Start Your Assessment
        </motion.button>

        <p className="mt-4 text-sm text-[#9ca3af] dark:text-[#6b7280]">
          Takes less than 2 minutes
        </p>

        {/* Trust indicators */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          {[
            { value: "Personalized", label: "Tailored to you" },
            { value: "Science-based", label: "Research-backed" },
            { value: "Simple", label: "Designed for real life" },
          ].map((item) => (
            <div key={item.value} className="text-center">
              <div className="text-sm font-semibold text-[#111] dark:text-white mb-1">
                {item.value}
              </div>
              <div className="text-xs text-[#9ca3af] dark:text-[#6b7280] leading-relaxed">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
