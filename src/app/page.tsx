"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AssessmentProvider, useAssessment } from "@/lib/assessment-context";
import { HeroSection } from "@/components/HeroSection";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressBar } from "@/components/ProgressBar";
import { RoutineCard } from "@/components/RoutineCard";
import { ProductCard } from "@/components/ProductCard";
import { LoadingPersonalization } from "@/components/LoadingPersonalization";
import {
  FALLBACK_PRODUCTS,
  getRecommendedProducts,
  type ProductDisplay,
} from "@/data/products";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-[#4a9c5c] tracking-[0.14em] mb-4">
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      className="my-8"
      style={{ height: "1px", background: "rgba(255,255,255,0.06)" }}
    />
  );
}

function AssessmentFlow() {
  const {
    state,
    dispatch,
    currentQuestion,
    progress,
    result,
    handleAnswer,
    handleNext,
  } = useAssessment();

  const [products, setProducts] = useState<ProductDisplay[]>([]);

  const selectedValue =
    currentQuestion?.id && state.answers[currentQuestion.id]
      ? state.answers[currentQuestion.id]
      : null;

  // Auto-advance loading → result
  useEffect(() => {
    if (state.step === "loading") {
      const t = setTimeout(() => dispatch({ type: "SHOW_RESULT" }), 3800);
      return () => clearTimeout(t);
    }
  }, [state.step, dispatch]);

  // Fetch products on result
  useEffect(() => {
    if (state.step === "result" && result && state.branch) {
      const handles = result.recommendedProductHandles;
      if (handles.length === 0) { setProducts([]); return; }
      getRecommendedProducts(state.branch)
        .then(setProducts)
        .catch(() => {
          setProducts(
            handles.map((h: string) => FALLBACK_PRODUCTS[h]).filter(Boolean)
          );
        });
    }
  }, [state.step, result, state.branch]);

  return (
    <main className="min-h-screen" style={{ background: "#0a0a0a", color: "#f5f5f5" }}>
      {/* Signature top rule */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50" style={{ background: "#4a9c5c" }} />

      <AnimatePresence mode="wait">

        {/* ---- HERO ---- */}
        {state.step === "hero" && (
          <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <HeroSection onStart={() => dispatch({ type: "START_ASSESSMENT" })} />
          </motion.div>
        )}

        {/* ---- BRANCH SELECT ---- */}
        {state.step === "branch-select" && currentQuestion && (
          <motion.div
            key="branch-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-md mx-auto">
              <ProgressBar current={1} total={progress.total} />
              <QuestionCard
                questionId={currentQuestion.id}
                text={currentQuestion.text}
                subtitle={currentQuestion.subtitle}
                options={currentQuestion.options}
                selectedValue={selectedValue}
                onSelect={(qId, val) => {
                  handleAnswer(qId, val);
                  dispatch({ type: "SELECT_BRANCH", branch: val as "hair" | "skin" | "physique" });
                }}
              />
            </div>
          </motion.div>
        )}

        {/* ---- QUESTIONS ---- */}
        {state.step === "questions" && currentQuestion && (
          <motion.div
            key={`q-${currentQuestion.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
          >
            <div className="w-full max-w-md mx-auto">
              <ProgressBar current={progress.current} total={progress.total} />
              <QuestionCard
                questionId={currentQuestion.id}
                text={currentQuestion.text}
                subtitle={currentQuestion.subtitle}
                options={currentQuestion.options}
                selectedValue={selectedValue}
                onSelect={(qId, val) => handleAnswer(qId, val)}
              />
              {selectedValue && (
                <motion.button
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="mt-6 w-full py-3.5 rounded-lg text-[15px] font-medium text-[#0a0a0a] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9c5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                  style={{ background: "#4a9c5c" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a4e")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#4a9c5c")}
                >
                  {progress.current >= progress.total - 1 ? "See my results" : "Continue"}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ---- LOADING ---- */}
        {state.step === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center px-6">
            <LoadingPersonalization branch={state.branch} answers={state.answers} />
          </motion.div>
        )}

        {/* ---- RESULTS ---- */}
        {state.step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 py-14 sm:py-20 max-w-xl mx-auto pb-32"
          >
            {/* Header */}
            <div className="mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hiro-logo.png" alt="HIRO Protocol" className="h-5 mb-8 invert" />
              <h1
                className="text-[28px] sm:text-[34px] font-semibold text-[#f5f5f5] leading-[1.12] mb-3"
                style={{ letterSpacing: "-0.025em" }}
              >
                {result.headline}
              </h1>
              <p className="text-[16px] text-[#8a8f98] leading-relaxed">
                {result.copy}
              </p>
            </div>

            <Divider />

            {/* Profile */}
            <section className="mb-10">
              <SectionLabel>{result.profileSummary.label}</SectionLabel>
              <div className="space-y-2.5">
                {result.profileSummary.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.07)",
                    }}
                  >
                    <p className="text-[14px] text-[#8a8f98] leading-relaxed">
                      {item.insight}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Products — highest CRO position */}
            {products.length > 0 && (
              <section className="mb-10">
                <SectionLabel>Your HIRO recommendations</SectionLabel>
                <p className="text-[13px] text-[#62666d] mb-5 leading-relaxed">
                  Selected based on your answers.
                </p>
                <div className="space-y-4">
                  {products.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              </section>
            )}

            <Divider />

            {/* Routine */}
            <section className="mb-10">
              <SectionLabel>Your recommended routine</SectionLabel>
              <div className="space-y-3">
                <RoutineCard routine={result.morningRoutine} />
                <RoutineCard routine={result.eveningRoutine} />
                <RoutineCard routine={result.weeklyHabits} />
              </div>
            </section>

            {/* Lifestyle */}
            <section className="mb-10">
              <SectionLabel>Lifestyle foundations</SectionLabel>
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <ul className="space-y-3">
                  {result.lifestyleSuggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-[#8a8f98] leading-relaxed">
                      <span className="text-[#4a9c5c] mt-0.5 flex-shrink-0 font-mono text-[11px] tabular-nums opacity-70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Why this fits */}
            <section className="mb-10">
              <SectionLabel>Why this routine fits you</SectionLabel>
              <ul className="space-y-2.5">
                {result.whyThisFits.map((reason, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-[#8a8f98] leading-relaxed">
                    <span className="text-[#4a9c5c] mt-0.5 flex-shrink-0 text-[11px]">—</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>

            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-[12px] text-[#3e3e44]">
                HIRO Protocol. Simple routines, real results.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- STICKY BOTTOM CTA ---- */}
      {state.step === "result" && products.length > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 py-4"
          style={{
            background: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="max-w-xl mx-auto">
            <a
              href={products[0].productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg text-[15px] font-medium text-[#0a0a0a] transition-colors"
              style={{ background: "#4a9c5c" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a4e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#4a9c5c")}
            >
              Shop your protocol
              <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </main>
  );
}

export default function HomePage() {
  return (
    <AssessmentProvider>
      <AssessmentFlow />
    </AssessmentProvider>
  );
}
