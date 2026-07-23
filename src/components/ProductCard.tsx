"use client";

import { motion } from "framer-motion";
import type { ProductDisplay } from "@/data/products";

interface ProductCardProps {
  product: ProductDisplay;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border border-[#e5e7eb] dark:border-[#1f1f1f] bg-white dark:bg-[#111] overflow-hidden"
    >
      {/* Product image */}
      {product.imageUrl ? (
        <div className="aspect-[3/2] bg-[#f3f4f6] dark:bg-[#0d0d0d]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl}
            alt={product.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[3/2] bg-[#f3f4f6] dark:bg-[#0d0d0d] flex items-center justify-center">
          <span className="text-4xl font-bold text-[#d1d5db] dark:text-[#2a2a2a] select-none">
            {product.name}
          </span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-xl font-bold text-[#111] dark:text-white">
            {product.name}
          </h3>
          {product.price && (
            <span className="text-lg font-semibold text-[#111] dark:text-white ml-3">
              {product.price}
            </span>
          )}
        </div>
        <p className="text-sm text-[#10b981] font-medium mb-3">
          {product.subtitle}
        </p>
        <p className="text-[15px] text-[#555] dark:text-[#a0a0a0] leading-relaxed mb-4">
          {product.description}
        </p>

        {/* How to use */}
        <div className="mb-4 p-4 rounded-xl bg-[#f9fafb] dark:bg-[#0d0d0d] border border-[#e5e7eb] dark:border-[#1a1a1a]">
          <p className="text-xs font-semibold text-[#9ca3af] dark:text-[#6b7280] mb-1.5">
            How to use
          </p>
          <p className="text-[14px] text-[#555] dark:text-[#a0a0a0] leading-relaxed">
            {product.howToUse}
          </p>
        </div>

        {/* Why recommended */}
        <div className="mb-5 p-4 rounded-xl bg-[#f9fafb] dark:bg-[#0d0d0d] border border-[#e5e7eb] dark:border-[#1a1a1a]">
          <p className="text-xs font-semibold text-[#9ca3af] dark:text-[#6b7280] mb-1.5">
            Why this was recommended
          </p>
          <p className="text-[14px] text-[#555] dark:text-[#a0a0a0] leading-relaxed">
            {product.recommendationReason}
          </p>
        </div>

        {/* CTA */}
        {product.availableForSale && product.checkoutUrl && (
          <motion.a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="block w-full py-3 text-center rounded-xl bg-[#111] dark:bg-white text-white dark:text-[#111] font-medium text-[15px] hover:bg-[#1f2937] dark:hover:bg-[#e5e5e5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10b981] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a0a0a]"
          >
            {product.cta}
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
