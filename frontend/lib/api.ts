import { Category, Brand, Product, ApiResponse } from "../types";

const API_BASE_URL = "http://127.0.0.1:8000/api";
export const MEDIA_BASE_URL = "http://127.0.0.1:8000";

export async function fetchCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    const data = await response.json();
    // If paginated
    return Array.isArray(data) ? data : data.results || [];
}

export async function fetchBrands(): Promise<Brand[]> {
    const response = await fetch(`${API_BASE_URL}/brands/`);
    if (!response.ok) throw new Error("Failed to fetch brands");
    const data = await response.json();
    return Array.isArray(data) ? data : data.results || [];
}

export async function fetchProducts(params?: URLSearchParams): Promise<ApiResponse<Product>> {
    const url = params ? `${API_BASE_URL}/products/?${params.toString()}` : `${API_BASE_URL}/products/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
}

export async function fetchProductById(id: string | number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}/`);
    if (!response.ok) {
        console.error(`Failed to fetch product with ID ${id}: ${response.status} ${response.statusText}`);
        throw new Error(`Failed to fetch product ${id}`);
    }
    return response.json();
}
