/**
 * Dynamic product layer.
 *
 * Fetches from Shopify REST API (public, no auth needed).
 * Falls back to accurate static data if the API is down.
 */

import { getProductByHandle, type ShopifyProduct } from "@/lib/shopify";

// Branch → Shopify product handles
const BRANCH_HANDLES: Record<string, string[]> = {
  hair: ["hiro-h01-root"],
  skin: ["hiro-h02-glow", "hiro-h03-restore"],
  physique: [],
};

// Shopify store domain for product page URLs
const STORE_DOMAIN = "https://hiroprotocol.com";

export interface ProductDisplay {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  howToUse: string;
  recommendationReason: string;
  price: string;
  imageUrl: string | null;
  imageAlt: string;
  availableForSale: boolean;
  variantId: number | null;
  productUrl: string;
  cta: string;
}

const HOW_TO_USE: Record<string, string> = {
  "hiro-h01-root": "Apply daily as part of your morning routine. Use consistently for best results.",
  "hiro-h02-glow": "Apply to clean, dry skin each morning. Follow with SPF moisturizer.",
  "hiro-h03-restore": "Apply to clean skin before bed. Let it absorb fully before your moisturizer.",
};

const RECOMMENDATION_REASONS: Record<string, string> = {
  "hiro-h01-root":
    "Your assessment focuses on hair health. H01 is formulated to support healthier-looking hair as part of a consistent daily routine.",
  "hiro-h02-glow":
    "Your morning routine needed lightweight daily support. H02 absorbs quickly and layers cleanly under SPF.",
  "hiro-h03-restore":
    "Your profile shows you want to address skin concerns while you sleep. H03 works overnight when your skin's repair cycle is most active.",
};

function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (isNaN(num)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

function mapToDisplay(product: ShopifyProduct): ProductDisplay {
  const variant = product.variants?.[0];
  const variantId = variant?.id || null;
  const productUrl = `${STORE_DOMAIN}/products/${product.handle}`;

  return {
    id: String(product.id),
    name: product.title,
    subtitle: product.product_type || "",
    description:
      product.body_html?.replace(/<[^>]*>/g, "").trim() ||
      product.title,
    howToUse: HOW_TO_USE[product.handle] || "Use as directed.",
    recommendationReason:
      RECOMMENDATION_REASONS[product.handle] ||
      "Recommended based on your assessment answers.",
    price: variant ? formatPrice(variant.price) : "",
    imageUrl: product.image?.src || product.images?.[0]?.src || null,
    imageAlt: product.title,
    availableForSale: variant?.available ?? false,
    variantId,
    productUrl,
    cta: product.title.includes("System") ? "View bundle" : "View product",
  };
}

// Accurate fallback with real variant IDs from the store
export const FALLBACK_PRODUCTS: Record<string, ProductDisplay> = {
  "hiro-h01-root": {
    id: "47781995774115",
    name: "H01 Root Revival",
    subtitle: "Hair support formula",
    description:
      "A daily hair support formula designed to complement your routine. H01 works with your body's natural processes to support healthier-looking hair over time.",
    howToUse: HOW_TO_USE["hiro-h01-root"],
    recommendationReason: RECOMMENDATION_REASONS["hiro-h01-root"],
    price: "$44.00",
    imageUrl: null,
    imageAlt: "H01 Root Revival",
    availableForSale: true,
    variantId: 47781995774115,
    productUrl: `${STORE_DOMAIN}/products/hiro-h01-root`,
    cta: "View product",
  },
  "hiro-h02-glow": {
    id: "47781995348131",
    name: "H02 Morning Glow",
    subtitle: "Daily skin support",
    description:
      "A lightweight morning formula that supports healthy-looking skin throughout the day. Absorbs quickly with no residue.",
    howToUse: HOW_TO_USE["hiro-h02-glow"],
    recommendationReason: RECOMMENDATION_REASONS["hiro-h02-glow"],
    price: "$44.00",
    imageUrl: null,
    imageAlt: "H02 Morning Glow",
    availableForSale: true,
    variantId: 47781995348131,
    productUrl: `${STORE_DOMAIN}/products/hiro-h02-glow`,
    cta: "View product",
  },
  "hiro-h03-restore": {
    id: "47781995413667",
    name: "H03 Night Repair",
    subtitle: "Overnight skin repair",
    description:
      "An evening formula that works with your skin's natural overnight repair cycle. Designed to be the last step before moisturizer.",
    howToUse: HOW_TO_USE["hiro-h03-restore"],
    recommendationReason: RECOMMENDATION_REASONS["hiro-h03-restore"],
    price: "$44.00",
    imageUrl: null,
    imageAlt: "H03 Night Repair",
    availableForSale: true,
    variantId: 47781995413667,
    productUrl: `${STORE_DOMAIN}/products/hiro-h03-restore`,
    cta: "View product",
  },
};

export async function getRecommendedProducts(
  branch: string
): Promise<ProductDisplay[]> {
  const handles = BRANCH_HANDLES[branch] || [];
  if (handles.length === 0) return [];

  try {
    const results = await Promise.all(
      handles.map((h) => getProductByHandle(h))
    );
    return results
      .filter((p): p is ShopifyProduct => p !== null)
      .map(mapToDisplay);
  } catch {
    return handles
      .map((h) => FALLBACK_PRODUCTS[h])
      .filter(Boolean);
  }
}

export async function getAllProducts(): Promise<ProductDisplay[]> {
  try {
    const { getProducts } = await import("@/lib/shopify");
    const products = await getProducts();
    return products.map(mapToDisplay);
  } catch {
    return Object.values(FALLBACK_PRODUCTS);
  }
}
