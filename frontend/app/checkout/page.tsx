"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, clearCart, getCartTotal } from "@/lib/cart";
import { API_BASE_URL, MEDIA_BASE_URL } from "@/lib/api";
import { CartItem } from "@/types";

const CheckoutPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        city: "",
        postal_code: "",
    });

    useEffect(() => {
        const items = getCart();
        if (items.length === 0 && !isSuccess) {
            router.push("/cart");
            return;
        }
        setCartItems(items);
        setTotal(getCartTotal());
    }, [router, isSuccess]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const orderData = {
                ...formData,
                items: cartItems.map(item => ({
                    product: item.product.id,
                    price: item.product.price,
                    quantity: item.quantity,
                    size: item.selectedSize.toString(),
                    color: item.selectedColor,
                })),
            };

            const response = await fetch(`${API_BASE_URL}orders/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                const data = await response.json();
                setOrderId(data.id);
                setIsSuccess(true);
                clearCart();
            } else {
                const error = await response.json();
                console.error("Order failed:", error);
                alert("Failed to place order. Please check your data.");
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
                <Navbar />
                <main className="flex-grow flex items-center justify-center pt-24 pb-16">
                    <div className="max-w-md w-full px-6 text-center">
                        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tight mb-4">ORDER CONFIRMED</h1>
                        <p className="text-muted-foreground mb-2 italic">Order #{orderId}</p>
                        <p className="text-slate-600 dark:text-slate-400 mb-10">
                            Thank you for your purchase. We've sent a confirmation email to <span className="text-foreground font-bold">{formData.email}</span>.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center space-x-3 px-10 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
                        >
                            <span>Continue Shopping</span>
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
                    <div className="flex items-center space-x-2 mb-12">
                        <Link href="/cart" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-4xl font-black tracking-tighter uppercase">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Shipping Form */}
                        <div>
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-10">
                                <div>
                                    <h2 className="text-xl font-bold mb-6 flex items-center uppercase tracking-wider">
                                        <span className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs mr-3">01</span>
                                        Shipping Information
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                                            <input
                                                required
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="Doe"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shipping Address</label>
                                            <input
                                                required
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="123 Street Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">City</label>
                                            <input
                                                required
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Postal Code</label>
                                            <input
                                                required
                                                type="text"
                                                name="postal_code"
                                                value={formData.postal_code}
                                                onChange={handleInputChange}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-accent outline-none transition-all"
                                                placeholder="10001"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-6 flex items-center uppercase tracking-wider">
                                        <span className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs mr-3">02</span>
                                        Payment Method
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="border-2 border-accent bg-accent/5 rounded-3xl p-6 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-3 bg-accent text-white rounded-2xl">
                                                    <CreditCard size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Credit / Debit Card</p>
                                                    <p className="text-xs text-muted-foreground">Secure payment via Stripe</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-4 border-accent flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>
                                            </div>
                                        </div>
                                        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex items-center justify-between opacity-50 cursor-not-allowed">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                                                    <CreditCard size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold">PayPal</p>
                                                    <p className="text-xs text-muted-foreground">Currently unavailable</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary Sidebar */}
                        <aside>
                            <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-slate-800 shadow-2xl sticky top-24">
                                <h2 className="text-2xl font-black mb-8 border-b border-slate-100 dark:border-slate-800 pb-6 uppercase tracking-tight">Summary</h2>

                                <div className="max-h-[300px] overflow-y-auto mb-8 pr-4 custom-scrollbar">
                                    {cartItems.map((item) => (
                                        <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
                                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex-shrink-0 overflow-hidden relative">
                                                {(() => {
                                                    const primaryImage = item.product.images.find(img => img.is_primary)?.image ||
                                                        (item.product.images.length > 0 ? item.product.images[0].image : "/placeholder-shoe.jpg");
                                                    const imageSrc = primaryImage.startsWith('http')
                                                        ? primaryImage
                                                        : primaryImage.startsWith('/media/')
                                                            ? `${MEDIA_BASE_URL}${primaryImage}`
                                                            : primaryImage;
                                                    return (
                                                        <img
                                                            src={imageSrc}
                                                            alt=""
                                                            className="object-cover w-full h-full"
                                                        />
                                                    );
                                                })()}
                                            </div>
                                            <div className="ml-4 flex-grow">
                                                <h4 className="text-sm font-bold line-clamp-1">{item.product.name}</h4>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                    Qty: {item.quantity} • Size: {item.selectedSize}
                                                </p>
                                            </div>
                                            <p className="text-sm font-black italic">
                                                ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium flex items-center">
                                            <Truck size={16} className="mr-2" /> Shipping
                                        </span>
                                        <span className="font-black uppercase tracking-widest text-[10px] text-green-500">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium flex items-center">
                                            <ShieldCheck size={16} className="mr-2" /> Protection
                                        </span>
                                        <span className="font-black italic">$0.00</span>
                                    </div>
                                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                                        <span className="text-lg font-black uppercase tracking-tighter">Total Due</span>
                                        <span className="text-4xl font-black tracking-tighter text-accent">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    form="checkout-form"
                                    disabled={isSubmitting}
                                    className="w-full py-6 bg-black text-white dark:bg-white dark:text-black rounded-3xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center space-x-3"
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-4 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        "Finalize Order"
                                    )}
                                </button>

                                <p className="text-center text-[8px] font-black text-slate-400 mt-6 uppercase tracking-[0.3em]">
                                    Encrypted Zero-Knowledge Transaction
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

export default CheckoutPage;
