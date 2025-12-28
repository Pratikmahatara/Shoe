import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative w-full pt-20 overflow-hidden bg-background px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[75vh]">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left z-10 py-12 lg:py-0">
                    <div className="mb-6 inline-flex items-center space-x-2 px-4 py-2 bg-secondary rounded-full border border-border">
                        <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Premium Essentials 2025</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 text-foreground drop-shadow-sm">
                        STEALTH <br />
                        <span className="text-slate-500">SERIES</span>
                    </h1>
                    <p className="max-w-lg text-muted-foreground text-lg mb-8 mx-auto lg:mx-0 font-medium leading-relaxed">
                        Meticulously crafted footwear in obsidian charcoal and slate. Engineered for those who appreciate the beauty of minimalism.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            href="/products"
                            className="px-8 py-5 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center space-x-2 hover:bg-accent transition-all duration-500 group shadow-xl"
                        >
                            <span>Explore Stealth</span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/categories/casual"
                            className="px-8 py-5 border border-border text-foreground hover:bg-secondary rounded-2xl font-bold transition-all duration-300"
                        >
                            View Lookbook
                        </Link>
                    </div>

                    <div className="mt-16 flex items-center justify-center lg:justify-start space-x-12 text-muted-foreground">
                        <div className="group cursor-default">
                            <p className="text-3xl font-black text-foreground group-hover:text-accent transition-colors">50k+</p>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Active Users</p>
                        </div>
                        <div className="h-10 w-[1px] bg-border"></div>
                        <div className="group cursor-default">
                            <p className="text-3xl font-black text-foreground group-hover:text-accent transition-colors">1.2k+</p>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em]">Curated Kits</p>
                        </div>
                    </div>
                </div>

                {/* Image */}
                <div className="flex-1 relative w-full h-[450px] lg:h-[600px] flex items-center justify-center">
                    {/* Shadow elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-accent/10 rounded-full blur-[120px]"></div>

                    <div className="relative w-full h-[85%] group">
                        <Image
                            src="/hero-shoe.png"
                            alt="Stealth Premium Shoe"
                            fill
                            className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)] transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                            priority
                        />
                    </div>

                    {/* Minimalist Tech Tags */}
                    <div className="absolute top-[20%] right-[0%] bg-card/80 backdrop-blur-md border border-border p-4 rounded-2xl hidden md:block shadow-2xl skew-x-[-6deg]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cushioning</p>
                        <p className="text-sm font-bold text-foreground">Stealth-Air™ Core</p>
                    </div>
                    <div className="absolute bottom-[20%] left-[0%] bg-card/80 backdrop-blur-md border border-border p-4 rounded-2xl hidden md:block shadow-2xl skew-x-[6deg]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Exterior</p>
                        <p className="text-sm font-bold text-foreground">Matte Carbon Fiber</p>
                    </div>
                </div>
            </div>

            {/* Brands strip - more subtle */}
            <div className="w-full bg-secondary/30 py-10 border-y border-border">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center opacity-30 grayscale hover:opacity-100 transition-all duration-700 gap-8">
                    <span className="text-xs font-black tracking-[0.5em]">NIKE</span>
                    <span className="text-xs font-black tracking-[0.5em]">ADIDAS</span>
                    <span className="text-xs font-black tracking-[0.5em]">PUMA</span>
                    <span className="text-xs font-black tracking-[0.5em]">REEBOK</span>
                    <span className="text-xs font-black tracking-[0.5em]">NEW BALANCE</span>
                </div>
            </div>
        </section>
    );
};

export default Hero;
