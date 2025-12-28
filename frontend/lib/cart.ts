import { CartItem, Product } from "../types";

const CART_STORAGE_KEY = "shoe_shop_cart";

export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: Product, quantity: number, size: number | string, color: string) {
    const cart = getCart();
    const existingIndex = cart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity, selectedSize: size, selectedColor: color });
    }

    saveCart(cart);
}

export function removeFromCart(productId: number, size: number | string, color: string) {
    const cart = getCart().filter(
        (item) => !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
    );
    saveCart(cart);
}

export function updateCartQuantity(productId: number, size: number | string, color: string, quantity: number) {
    const cart = getCart();
    const index = cart.findIndex(
        (item) => item.product.id === productId && item.selectedSize === size && item.selectedColor === color
    );

    if (index > -1) {
        if (quantity <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = quantity;
        }
        saveCart(cart);
    }
}

export function clearCart() {
    saveCart([]);
}

export function getCartCount(): number {
    return getCart().reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal(): number {
    return getCart().reduce((total, item) => total + parseFloat(item.product.price) * item.quantity, 0);
}
