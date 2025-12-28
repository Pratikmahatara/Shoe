import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, ArrowUpRight } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground border-t border-border/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-3xl font-black tracking-tighter mb-6 block">SHOE.LAB</Link>
                        <p className="text-slate-400 text-sm max-w-xs leading-relaxed font-medium">
                            The definitive archive of high-performance footwear. Meticulously curated for those who demand excellence in every step.
                        </p>
                        <div className="flex space-x-6 mt-8">
                            <a href="#" className="text-slate-500 hover:text-white transition-all duration-300"><Facebook size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-all duration-300"><Twitter size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-all duration-300"><Instagram size={18} /></a>
                            <a href="#" className="text-slate-500 hover:text-white transition-all duration-300"><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Collections</h3>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300 flex items-center group">Archive <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                            <li><Link href="/categories/running" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300">Performance</Link></li>
                            <li><Link href="/categories/casual" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300">Lifestyle</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Client Service</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300">Tracking</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300">Returns Policy</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-white text-sm font-bold transition-all duration-300">Private Concierge</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Stealth List</h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Join our inner circle for exclusive early access and limited edition drops.
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="bg-secondary/10 border-b-2 border-slate-800 px-0 py-3 text-sm w-full focus:outline-none focus:border-white transition-all duration-500 placeholder:text-slate-600 font-bold"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-white"
                            >
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-[10px] font-black tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} SHOE.LAB LTD. ALL RIGHTS RESERVED.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
