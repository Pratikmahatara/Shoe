import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchCategories, fetchBrands } from "@/lib/api";

interface ProductsPageProps {
    searchParams: {
        category?: string;
        brand?: string;
        search?: string;
        ordering?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const params = new URLSearchParams();
    if (searchParams.category) params.append("category", searchParams.category);
    if (searchParams.brand) params.append("brand", searchParams.brand);
    if (searchParams.search) params.append("search", searchParams.search);
    if (searchParams.ordering) params.append("ordering", searchParams.ordering);

    const productsResponse = await fetchProducts(params);
    const categories = await fetchCategories();
    const brands = await fetchBrands();

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight mb-2">Shop All Shoes</h1>
                            <p className="text-muted-foreground">Find your perfect pair from our curated collection.</p>
                        </div>

                        <div className="flex items-center space-x-4 mt-6 md:mt-0">
                            <select className="bg-white dark:bg-slate-900 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none">
                                <option>Newest Arrivals</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Rated</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((cat) => (
                                        <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group">
                                            <input type="checkbox" className="rounded border-slate-300 text-accent focus:ring-accent" />
                                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-accent transition-colors">{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Brands</h3>
                                <div className="space-y-2">
                                    {brands.map((brand) => (
                                        <label key={brand.id} className="flex items-center space-x-3 cursor-pointer group">
                                            <input type="checkbox" className="rounded border-slate-300 text-accent focus:ring-accent" />
                                            <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-accent transition-colors">{brand.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <input type="range" className="w-full accent-accent" min="0" max="500" />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>$0</span>
                                        <span>$500+</span>
                                    </div>
                                </div>
                            </div>
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
                                    <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
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
