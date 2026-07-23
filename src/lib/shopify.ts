/**
 * Shopify product client.
 *
 * Uses the public REST API (products.json) which works without auth
 * when the store's public sales channel is enabled.
 * Falls back to Storefront GraphQL when the token is properly scoped.
 */

const DOMAIN = "tepkuf-u1.myshopify.com";

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  tags: string;
  image: { src: string } | null;
  images: { src: string }[];
  variants: {
    id: number;
    title: string;
    price: string;
    available: boolean;
    sku: string;
  }[];
}

interface ProductsResponse {
  products: ShopifyProduct[];
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  // Try public REST API first (works without auth)
  const res = await fetch(
    `https://${DOMAIN}/products.json?limit=50`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error(`Shopify API returned ${res.status}`);
  }

  const data: ProductsResponse = await res.json();
  return data.products;
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.handle === handle) || null;
}

export function getCheckoutUrl(variantId: number): string {
  return `https://${DOMAIN}/cart/${variantId}:1`;
}

export function getProductUrl(handle: string): string {
  return `https://hiroprotocol.com/products/${handle}`;
}
