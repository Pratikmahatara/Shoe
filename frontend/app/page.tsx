import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { fetchProducts, fetchCategories } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";

export default async function Home() {
  const productsResponse = await fetchProducts();
  const featuredProducts = productsResponse.results.slice(0, 4);
  const categories = await fetchCategories();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        {/* Featured Products */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Seasonal Selection</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground drop-shadow-sm">FEATURED <br /> <span className="text-slate-200 dark:text-slate-800">ARCHIVE</span></h2>
              </div>
              <Link href="/products" className="group flex items-center space-x-3 text-sm font-black uppercase tracking-widest text-foreground hover:text-accent transition-all">
                <span>View Full Catalog</span>
                <div className="w-12 h-[1px] bg-foreground group-hover:w-20 group-hover:bg-accent transition-all duration-500"></div>
                <MoveRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section - High End Style */}
        <section className="py-32 bg-secondary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4 block">Disciplines</span>
              <h2 className="text-5xl font-black tracking-tighter">SHOP BY CATEGORY</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {categories.slice(0, 3).map((category, index) => (
                <Link
                  href={`/categories/${category.slug}`}
                  key={category.id}
                  className={`relative h-[500px] rounded-[48px] overflow-hidden group cursor-pointer shadow-2xl ${index === 0 ? 'md:col-span-2' : ''
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-700"></div>
                  {/* Decorative background for category */}
                  <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 flex items-center justify-center -z-10">
                    <span className="text-9xl font-black text-white/5 dark:text-black/20 select-none tracking-tighter leading-none italic uppercase -rotate-12 scale-150">
                      {category.name}
                    </span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden">
                    <div className="w-full h-full border border-white/10 rounded-[32px] flex items-center justify-center group-hover:scale-95 transition-transform duration-1000">
                      {/* Small text circle or something decorative could go here */}
                    </div>
                  </div>

                  <div className="absolute bottom-12 left-12 z-20">
                    <h3 className="text-white text-4xl font-black tracking-tighter mb-2 group-hover:translate-x-2 transition-transform duration-500 uppercase">{category.name}</h3>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-6 max-w-xs">{category.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-500">
                        <ArrowRight size={20} />
                      </div>
                      <span className="text-white text-[10px] font-black uppercase tracking-[0.5em] opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0 transition-all duration-500">Explore Collection</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Mission - Luxury Stealth */}
        <section className="py-40 bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-slate-900/50 rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-900/30 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>

          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 mb-8 block">Our Manifesto</span>
            <h2 className="text-6xl md:text-8xl font-black mb-12 tracking-[calc(-0.05em)] leading-[0.9] uppercase">
              The Lab is <br />
              <span className="text-slate-500">where performance</span> <br />
              meets obsidian.
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-16 leading-relaxed max-w-2xl mx-auto font-medium">
              We operate at the intersection of technical innovation and high-fashion aesthetics. Every drop is a testament to the pursuit of the perfect silhoutte.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-16 md:gap-24">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black mb-2 italic">A+</span>
                <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">Grade Quality</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black mb-2 italic">∞</span>
                <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">Sustainability</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black mb-2 italic">24/7</span>
                <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase">Curation</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
