"use client";

import { motion } from "framer-motion";
import type { ProductDisplay } from "@/data/products";

interface ProductCardProps {
  product: ProductDisplay;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
      className="rounded-xl border overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      {/* Image */}
      {product.imageUrl ? (
        <div className="aspect-[16/9] overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div
          className="aspect-[16/9] flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <span
            className="text-6xl font-bold select-none"
            style={{
              color: "rgba(255,255,255,0.04)",
              letterSpacing: "-0.04em",
            }}
          >
            {product.name.split(" ")[0]}
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3
            className="text-[17px] font-semibold text-[#f5f5f5]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {product.name}
          </h3>
          {product.price && (
            <span className="text-[15px] font-medium text-[#f5f5f5] tabular-nums flex-shrink-0">
              {product.price}
            </span>
          )}
        </div>

        {product.subtitle && (
          <p className="text-[12px] text-[#4a9c5c] font-medium mb-4 tracking-[0.04em]">
            {product.subtitle}
          </p>
        )}

        {/* Why recommended — tinted green */}
        <div
          className="mb-3 p-4 rounded-lg border"
          style={{
            background: "rgba(74,156,92,0.06)",
            borderColor: "rgba(74,156,92,0.2)",
          }}
        >
          <p className="text-[11px] font-semibold text-[#4a9c5c] mb-1.5 tracking-[0.08em]">
            Why this was picked for you
          </p>
          <p className="text-[13px] text-[#d0d6e0] leading-relaxed">
            {product.recommendationReason}
          </p>
        </div>

        {/* How to use */}
        <div
          className="mb-5 p-4 rounded-lg border"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[11px] font-semibold text-[#62666d] mb-1.5 tracking-[0.08em]">
            How to use
          </p>
          <p className="text-[13px] text-[#8a8f98] leading-relaxed">
            {product.howToUse}
          </p>
        </div>

        {/* CTA */}
        <motion.a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-[14px] font-medium text-[#0a0a0a] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a9c5c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          style={{ background: "#4a9c5c" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3d8a4e")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4a9c5c")}
        >
          {product.cta}
          <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}
