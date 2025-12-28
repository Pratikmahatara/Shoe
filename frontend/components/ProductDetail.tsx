"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ShoppingCart, TrendingUp, ShieldCheck, RefreshCw, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { addToCart } from "../lib/cart";
import { MEDIA_BASE_URL } from "../lib/api";

interface ProductDetailProps {
    product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [activeImage, setActiveImage] = useState(
        product.images.find(img => img.is_primary)?.image ||
        (product.images.length > 0 ? product.images[0].image : "/placeholder-shoe.jpg")
    );

    const handleAddToCart = () => {
        addToCart(product, 1, selectedSize, selectedColor);
        // Could add a toast notification here
    };

    const fullImageSrc = (src: string) =>
        src.startsWith('http')
            ? src
            : src.startsWith('/media/')
                ? `${MEDIA_BASE_URL}${src}`
                : src;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 border border-border group">
                    <Image
                        src={fullImageSrc(activeImage)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute top-6 left-6 flex space-x-2">
                        <span className="glass border-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center">
                            <TrendingUp size={12} className="mr-1 text-accent" /> Trending
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveImage(img.image)}
                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img.image ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                                }`}
                        >
                            <Image src={fullImageSrc(img.image)} alt="Preview" fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
                <div className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-accent font-bold uppercase tracking-widest mb-4">
                        <span>{product.brand.name}</span>
                        <ChevronRight size={14} />
                        <span>{product.category.name}</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < Math.floor(product.average_rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                                />
                            ))}
                            <span className="text-sm font-bold ml-2">{product.average_rating.toFixed(1)}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm font-medium underline cursor-pointer">{product.review_count} Reviews</span>
                    </div>
                    <p className="text-3xl font-mono font-black text-accent">${parseFloat(product.price).toFixed(2)}</p>
                </div>

                {/* Options */}
                <div className="space-y-8 mb-10 flex-grow">
                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Select Color</h3>
                        <div className="flex flex-wrap gap-3">
                            {product.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedColor === color
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-white dark:bg-slate-900 border-border hover:border-accent"
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider">Select Size</h3>
                            <button className="text-xs text-muted-foreground underline uppercase font-bold tracking-widest">Size Guide</button>
                        </div>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`py-3 rounded-xl text-sm font-bold border transition-all ${selectedSize === size
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-white dark:bg-slate-900 border-border hover:border-accent"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-accent transition-all duration-300 group shadow-lg shadow-accent/20"
                    >
                        <ShoppingCart size={20} className="group-hover:rotate-12 transition-transform" />
                        <span>Add to Bag</span>
                    </button>

                    <div className="grid grid-cols-3 gap-4 pt-8">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <ShieldCheck size={20} className="text-accent" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest">2 Year Warranty</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <RefreshCw size={20} className="text-accent" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Free Returns</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full">
                                <TrendingUp size={20} className="text-accent" />
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Best Price</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
