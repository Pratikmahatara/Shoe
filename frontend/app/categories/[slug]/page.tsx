import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";

interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const categories = await fetchCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        return <div>Category not found</div>;
    }

    const productsResponse = await fetchProducts(new URLSearchParams({ category: category.id.toString() }));

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight mb-4">{category.name} Shoes</h1>
                        <p className="text-muted-foreground text-lg max-w-2xl">{category.description}</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar (simplified for category page) */}
                        <aside className="w-full lg:w-48 space-y-8">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-accent">Filters</h3>
                            <div className="h-[1px] bg-border w-full"></div>
                            <p className="text-sm text-muted-foreground">Apply more filters in the <Link href="/products" className="text-primary font-bold underline">Main shop</Link></p>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            {productsResponse.results.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {productsResponse.results.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-border">
                                    <p className="text-lg text-muted-foreground">No products found in this category yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import Link from "next/link";
