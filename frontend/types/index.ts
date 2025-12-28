export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Brand {
  id: number;
  name: string;
  logo: string | null;
  description: string;
}

export interface ProductImage {
  id: number;
  image: string;
  is_primary: boolean;
}

export interface Review {
  id: number;
  product: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: Category;
  brand: Brand;
  stock: number;
  available: boolean;
  images: ProductImage[];
  sizes: number[] | string[];
  colors: string[];
  average_rating: number;
  review_count: number;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number | string;
  selectedColor: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
