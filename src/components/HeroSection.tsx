"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(74,156,92,0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg relative"
      >
        {/* Logo */}
        <div className="mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hiro-logo.png"
            alt="HIRO Protocol"
            className="h-6 mx-auto invert"
          />
        </div>

        {/* Eyebrow */}
        <p className="text-[11px] font-medium tracking-[0.18em] text-[#4a9c5c] mb-5">
          personalized wellness
        </p>

        <h1
          className="text-[38px] sm:text-[52px] font-semibold text-[#f5f5f5] leading-[1.05] mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          Your routine,<br />built around you
        </h1>

        <p className="text-[16px] text-[#8a8f98] leading-relaxed mb-10 max-w-xs mx-auto">
          A few questions. A protocol made for how you actually live.
        </p>

        <motion.button
          onClick={onStart}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-[15px] font-medium text-[#0a0a0a] cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9c5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          style={{ background: "#4a9c5c" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a4e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4a9c5c")}
        >
          Start assessment
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>

        <p className="mt-5 text-[13px] text-[#62666d]">
          Takes 2 minutes
        </p>
      </motion.div>
    </section>
  );
}
