"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, removeFromCart, updateCartQuantity, getCartTotal } from "@/lib/cart";
import { CartItem } from "@/types";
import { MEDIA_BASE_URL } from "@/lib/api";

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setCartItems(getCart());
        setTotal(getCartTotal());

        const handleUpdate = () => {
            setCartItems(getCart());
            setTotal(getCartTotal());
        };

        window.addEventListener("cart-updated", handleUpdate);
        return () => window.removeEventListener("cart-updated", handleUpdate);
    }, []);

    const handleRemove = (id: number, size: number | string, color: string) => {
        removeFromCart(id, size, color);
    };

    const handleQuantity = (id: number, size: number | string, color: string, delta: number) => {
        const item = cartItems.find(i => i.product.id === id && i.selectedSize === size && i.selectedColor === color);
        if (item) {
            updateCartQuantity(id, size, color, item.quantity + delta);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-24 pb-16">
                    <div className="text-center px-4">
                        <div className="bg-slate-100 dark:bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag size={40} className="text-slate-400" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                            Looks like you haven't added anything to your cart yet. Explore our collection to find your perfect pair.
                        </p>
                        <Link
                            href="/products"
                            className="px-8 py-3 bg-accent text-white rounded-full font-bold inline-flex items-center space-x-2 hover:bg-accent/90 transition-colors"
                        >
                            <span>Explore Collection</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
            <Navbar />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight mb-12">Shopping Bag</h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-1 space-y-6">
                            {cartItems.map((item) => {
                                const primaryImage = item.product.images.find(img => img.is_primary)?.image ||
                                    (item.product.images.length > 0 ? item.product.images[0].image : "/placeholder-shoe.jpg");
                                const imageSrc = primaryImage.startsWith('http')
                                    ? primaryImage
                                    : primaryImage.startsWith('/media/')
                                        ? `${MEDIA_BASE_URL}${primaryImage}`
                                        : primaryImage;

                                return (
                                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white dark:bg-slate-900 rounded-3xl p-6 flex items-center shadow-sm border border-border group">
                                        <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                                            <Image
                                                src={imageSrc}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="ml-6 flex-1">
                                            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1">{item.product.name}</h3>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-4">
                                                        <span>Size: <span className="text-foreground font-medium">{item.selectedSize}</span></span>
                                                        <span>Color: <span className="text-foreground font-medium">{item.selectedColor}</span></span>
                                                    </div>
                                                </div>
                                                <p className="font-mono font-bold text-lg">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center border border-border rounded-full p-1 bg-slate-50 dark:bg-slate-800">
                                                    <button
                                                        onClick={() => handleQuantity(item.product.id, item.selectedSize, item.selectedColor, -1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantity(item.product.id, item.selectedSize, item.selectedColor, 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(item.product.id, item.selectedSize, item.selectedColor)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <aside className="w-full lg:w-96">
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sticky top-24 shadow-sm border border-border">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="text-foreground font-mono font-bold">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Estimated Shipping</span>
                                        <span className="text-foreground font-mono font-bold">Free</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Tax</span>
                                        <span className="text-foreground font-mono font-bold">$0.00</span>
                                    </div>
                                    <div className="border-t border-border pt-4 flex justify-between">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-2xl font-black font-mono text-accent">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="w-full">
                                    <button className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-accent transition-all duration-300 shadow-lg shadow-accent/20 mb-4">
                                        Proceed to Checkout
                                    </button>
                                </Link>

                                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                                    Secure Checkout Guaranteed
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
