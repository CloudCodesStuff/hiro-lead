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

  // Auto-advance loading -> result
  useEffect(() => {
    if (state.step === "loading") {
      const t = setTimeout(() => dispatch({ type: "SHOW_RESULT" }), 3800);
      return () => clearTimeout(t);
    }
  }, [state.step, dispatch]);

  // Fetch products when results are shown
  useEffect(() => {
    if (state.step === "result" && result) {
      const handles = result.recommendedProductHandles;
      if (handles.length === 0) {
        setProducts([]);
        return;
      }

      getRecommendedProducts(result.recommendedProductHandles[0]?.includes("h01")
        ? "hair"
        : "skin")
        .then(setProducts)
        .catch(() => {
          // Fallback: map handles to static products
          const fallbackMap: Record<string, ProductDisplay> = {
            "hiro-h01-root": FALLBACK_PRODUCTS.h01,
            "hiro-h02-glow": FALLBACK_PRODUCTS.h02,
            "hiro-h03-restore": FALLBACK_PRODUCTS.h03,
          };
          setProducts(
            handles
              .map((h: string) => fallbackMap[h])
              .filter(Boolean)
          );
        });
    }
  }, [state.step, result]);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <AnimatePresence mode="wait">
        {/* ---- HERO ---- */}
        {state.step === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <HeroSection
              onStart={() => dispatch({ type: "START_ASSESSMENT" })}
            />
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
            <ProgressBar current={1} total={progress.total} />
            <QuestionCard
              questionId={currentQuestion.id}
              text={currentQuestion.text}
              subtitle={currentQuestion.subtitle}
              options={currentQuestion.options}
              selectedValue={selectedValue}
              onSelect={(qId, val) => {
                handleAnswer(qId, val);
                dispatch({
                  type: "SELECT_BRANCH",
                  branch: val as "hair" | "skin" | "physique",
                });
              }}
            />
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
            <ProgressBar current={progress.current} total={progress.total} />
            <QuestionCard
              questionId={currentQuestion.id}
              text={currentQuestion.text}
              subtitle={currentQuestion.subtitle}
              options={currentQuestion.options}
              selectedValue={selectedValue}
              onSelect={(qId, val) => {
                handleAnswer(qId, val);
              }}
            />

            {selectedValue && (
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleNext}
                className="mt-6 px-6 py-3 rounded-xl bg-[#111] dark:bg-white text-white dark:text-[#111] font-medium text-[15px] hover:bg-[#1f2937] dark:hover:bg-[#e5e5e5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]"
              >
                {progress.current >= progress.total - 1
                  ? "See My Results"
                  : "Continue"}
              </motion.button>
            )}
          </motion.div>
        )}

        {/* ---- LOADING ---- */}
        {state.step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center px-6"
          >
            <LoadingPersonalization />
          </motion.div>
        )}

        {/* ---- RESULTS ---- */}
        {state.step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 py-12 sm:py-16 max-w-2xl mx-auto"
          >
            {/* Header */}
            <div className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hiro-logo.png"
                alt="HIRO Protocol"
                className="h-5 mb-8 dark:invert"
              />
              <h1 className="text-[28px] sm:text-[34px] font-bold text-[#111] dark:text-white leading-[1.15] tracking-[-0.02em] mb-4">
                {result.headline}
              </h1>
              <p className="text-[#6b7280] dark:text-[#9ca3af] text-[17px] leading-relaxed max-w-lg">
                {result.copy}
              </p>
            </div>

            <div className="border-t border-[#e5e7eb] dark:border-[#1f1f1f] my-8" />

            {/* ---- CURRENT PROFILE ---- */}
            <section className="mb-10">
              <h2 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-5">
                {result.profileSummary.label}
              </h2>
              <div className="space-y-4">
                {result.profileSummary.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-[#e5e7eb] dark:border-[#1f1f1f] bg-[#f9fafb] dark:bg-[#0d0d0d]"
                  >
                    <p className="text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed">
                      {item.insight}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- RECOMMENDED ROUTINE ---- */}
            <section className="mb-10">
              <h2 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-5">
                Your recommended routine
              </h2>
              <div className="space-y-4">
                <RoutineCard routine={result.morningRoutine} />
                <RoutineCard routine={result.eveningRoutine} />
                <RoutineCard routine={result.weeklyHabits} />
              </div>
            </section>

            {/* ---- LIFESTYLE ---- */}
            <section className="mb-10">
              <h2 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-5">
                Lifestyle foundations
              </h2>
              <div className="rounded-2xl border border-[#e5e7eb] dark:border-[#1f1f1f] bg-white dark:bg-[#111] p-5 sm:p-6">
                <ul className="space-y-3">
                  {result.lifestyleSuggestions.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed"
                    >
                      <span className="text-[#10b981] mt-0.5 flex-shrink-0 font-mono text-xs">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ---- WHY THIS FITS ---- */}
            <section className="mb-10">
              <h2 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-5">
                Why this routine fits you
              </h2>
              <ul className="space-y-3">
                {result.whyThisFits.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed"
                  >
                    <span className="text-[#10b981] mt-0.5 flex-shrink-0">
                      -
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </section>

            <div className="border-t border-[#e5e7eb] dark:border-[#1f1f1f] my-8" />

            {/* ---- PRODUCTS ---- */}
            {products.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-3">
                  Your HIRO recommendations
                </h2>
                <p className="text-[#6b7280] dark:text-[#9ca3af] text-[15px] leading-relaxed mb-6">
                  These HIRO products were selected because they fit your
                  routine. Each recommendation is tied to what you told us about
                  your needs.
                </p>
                <div className="space-y-4">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            )}

            {/* ---- TRUST ELEMENTS ---- */}
            <section className="mb-10">
              <div className="rounded-2xl border border-[#e5e7eb] dark:border-[#1f1f1f] bg-white dark:bg-[#111] p-6 sm:p-8">
                <h3 className="text-xs font-semibold text-[#10b981] tracking-[0.15em] mb-5">
                  Why HIRO exists
                </h3>
                <p className="text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed mb-4">
                  HIRO Protocol was built for people who want real results without complicated routines. We focus on a few things done consistently.
                </p>
                <p className="text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed">
                  Our recommendations come from established research. We do not make claims we cannot support. We build systems that work when you follow them.
                </p>
              </div>
            </section>

            {/* ---- FOOTER ---- */}
            <div className="text-center pb-12">
              <p className="text-[13px] text-[#9ca3af] dark:text-[#555]">
                HIRO Protocol. Simple routines, real results.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
