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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="rounded-2xl border border-[#e5e7eb] dark:border-[#1f1f1f] bg-white dark:bg-[#111] overflow-hidden"
    >
      {/* Product image */}
      {product.imageUrl ? (
        <div className="aspect-[4/3] bg-[#f3f4f6] dark:bg-[#0d0d0d] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-[#f3f4f6] dark:bg-[#0d0d0d] flex items-center justify-center">
          <span className="text-5xl font-bold text-[#e5e7eb] dark:text-[#1f1f1f] select-none tracking-tight">
            {product.name.split(" ")[0]}
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-[18px] font-bold text-[#111] dark:text-white leading-tight">
            {product.name}
          </h3>
          {product.price && (
            <span className="text-[17px] font-semibold text-[#111] dark:text-white tabular-nums flex-shrink-0">
              {product.price}
            </span>
          )}
        </div>

        {product.subtitle && (
          <p className="text-sm text-[#10b981] font-medium mb-4">
            {product.subtitle}
          </p>
        )}

        {/* Why recommended — most important, up top */}
        <div className="mb-4 p-4 rounded-xl bg-[#f0fdf4] dark:bg-[#10b981]/5 border border-[#bbf7d0] dark:border-[#10b981]/20">
          <p className="text-xs font-semibold text-[#10b981] mb-1.5">
            Why this was picked for you
          </p>
          <p className="text-[14px] text-[#374151] dark:text-[#d1d5db] leading-relaxed">
            {product.recommendationReason}
          </p>
        </div>

        {/* How to use */}
        <div className="mb-5 p-4 rounded-xl bg-[#f9fafb] dark:bg-[#0d0d0d] border border-[#e5e7eb] dark:border-[#1a1a1a]">
          <p className="text-xs font-semibold text-[#9ca3af] dark:text-[#6b7280] mb-1.5">
            How to use
          </p>
          <p className="text-[14px] text-[#555] dark:text-[#a0a0a0] leading-relaxed">
            {product.howToUse}
          </p>
        </div>

        {/* CTA → product page */}
        <motion.a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#111] dark:bg-white text-white dark:text-[#111] font-medium text-[15px] hover:bg-[#1f2937] dark:hover:bg-[#e5e5e5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]"
        >
          {product.cta}
          <svg
            className="w-4 h-4 opacity-60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}
