"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { getCartCount } from "@/lib/cart";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        updateCart();
        window.addEventListener("cart-updated", updateCart);
        return () => window.removeEventListener("cart-updated", updateCart);
    }, []);

    const updateCart = () => {
        setCartCount(getCartCount());
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            <span className="text-primary-foreground font-black text-xs">SL</span>
                        </div>
                        <span className="text-xl font-black tracking-[0.2em] text-foreground">SHOE.LAB</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="/products" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Archive</Link>
                        <Link href="/categories/running" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Performance</Link>
                        <Link href="/categories/casual" className="text-xs font-black uppercase tracking-widest hover:text-accent transition-colors">Lifestyle</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="p-2 hover:bg-secondary rounded-xl transition-all duration-300">
                            <Search size={18} />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-xl transition-all duration-300">
                            <User size={18} />
                        </button>
                        <Link href="/cart" className="relative p-2 bg-primary text-primary-foreground rounded-xl transition-all duration-300 hover:scale-105">
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full font-black shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className="relative p-2 bg-primary text-primary-foreground rounded-xl">
                            <ShoppingCart size={18} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full font-black">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl border border-border"
                        >
                            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-background border-t border-border animate-in fade-in slide-in-from-top-4 duration-500 pb-8">
                    <div className="px-6 pt-6 space-y-4">
                        <Link href="/products" className="block text-xl font-black uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Archive</Link>
                        <Link href="/categories/running" className="block text-xl font-black uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Performance</Link>
                        <Link href="/categories/casual" className="block text-xl font-black uppercase tracking-widest border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Lifestyle</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
