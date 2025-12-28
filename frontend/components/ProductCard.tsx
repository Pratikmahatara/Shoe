"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Plus } from "lucide-react";
import { Product } from "../types";
import { addToCart } from "../lib/cart";
import { MEDIA_BASE_URL } from "../lib/api";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    // Use a fallback image if no images provided
    const primaryImage = product.images.find(img => img.is_primary)?.image ||
        (product.images.length > 0 ? product.images[0].image : "/placeholder-shoe.jpg");

    // Ensure internal placeholder is used if API image fails or is empty
    const imageSrc = primaryImage.startsWith('http')
        ? primaryImage
        : primaryImage.startsWith('/media/')
            ? `${MEDIA_BASE_URL}${primaryImage}`
            : primaryImage;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const size = product.sizes?.[0] || "Universal";
        const color = product.colors?.[0] || "Standard";
        addToCart(product, 1, size, color);
    };

    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className="bg-card rounded-[32px] overflow-hidden hover-lift border border-border/50 transition-all duration-500 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-black">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary/50 p-6">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700 drop-shadow-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-primary-foreground text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                            {product.brand.name}
                        </span>
                    </div>

                    <div className="absolute top-4 right-4">
                        {product.stock <= 5 && product.stock > 0 && (
                            <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">
                                Low Stock
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="absolute bottom-6 right-6 bg-black text-white dark:bg-white dark:text-black w-12 h-12 rounded-2xl flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 active:scale-95 shadow-2xl z-10"
                    >
                        <Plus size={20} strokeWidth={3} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="mb-4">
                        <h3 className="font-black text-xl leading-tight line-clamp-1 group-hover:text-accent transition-colors tracking-tight">
                            {product.name}
                        </h3>
                        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                            {product.category.name}
                        </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-col">
                            <span className="text-2xl font-black font-mono tracking-tighter">
                                ${parseFloat(product.price).toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-1 mt-1">
                                <Star
                                    size={10}
                                    className="fill-foreground text-foreground"
                                />
                                <span className="text-[10px] text-muted-foreground font-black tracking-widest">
                                    {product.average_rating.toFixed(1)}
                                </span>
                            </div>
                        </div>

                        <div className="h-8 w-[1px] bg-border mx-4"></div>

                        <div className="flex-1 flex flex-col items-end">
                            {product.stock > 0 ? (
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available</span>
                            ) : (
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Sold Out</span>
                            )}
                            <span className="text-[8px] font-bold text-slate-300 dark:text-slate-600">LTD Edition</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
