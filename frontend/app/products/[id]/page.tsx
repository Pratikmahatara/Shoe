import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import { fetchProductById, fetchProducts } from "@/lib/api";
import { Star } from "lucide-react";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await fetchProductById(id);
    const relatedProductsResponse = await fetchProducts(new URLSearchParams({ category: product.category.id.toString() }));
    const relatedProducts = relatedProductsResponse.results.filter(p => p.id !== product.id).slice(0, 4);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <ProductDetail product={product} />

                    {/* Description & Reviews */}
                    <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-border pt-24">
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Product Description</h2>
                                <p className="text-muted-foreground leading-loose text-lg">
                                    {product.description}
                                </p>
                                <p className="mt-6 text-muted-foreground leading-loose text-lg">
                                    Designed for the demands of the modern athlete, this shoe combines innovative technology with timeless style. The breathable upper ensures your feet stay cool during high-intensity sessions, while the responsive midsole provides unparalleled cushioning and energy return.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-8">Customer Reviews ({product.review_count})</h2>
                                <div className="space-y-8">
                                    {product.reviews && product.reviews.length > 0 ? (
                                        product.reviews.map((review: any) => (
                                            <div key={review.id} className="pb-8 border-b border-border last:border-0">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="font-bold">{review.user_name}</h4>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(review.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-1 mb-4">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-muted-foreground italic">&ldquo;{review.comment}&rdquo;</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground">No reviews yet for this product. Be the first to review!</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Side Info */}
                        <div className="space-y-12">
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-border">
                                <h3 className="text-lg font-bold mb-4">Shipping & Returns</h3>
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    <li>• Free standard delivery on all orders</li>
                                    <li>• Returns within 30 days</li>
                                    <li>• Secure checkout with SSL encryption</li>
                                </ul>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-border">
                                <h3 className="text-lg font-bold mb-4">Premium Quality</h3>
                                <p className="text-sm text-muted-foreground">
                                    Every pair in our collection is authenticated and inspected by experts to ensure you receive only the best.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-24 border-t border-border pt-24">
                            <h2 className="text-3xl font-bold mb-12">You Might Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
