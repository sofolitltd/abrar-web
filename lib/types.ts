// types/Product.ts

// lib/types.ts (or where your Product interface is defined)

export interface Product {
  id: string;
  name: string;
  regularPrice: number;
  salePrice: number; // This will be 0 if no sale
  costPrice: number; // From your JSON
  images: string[]; // This is an array of image URLs
  stock: number;
  category: string;
  subCategory: string;
  description: string;
  brand: string;
  sku: number;
  slug: string;
  isFeatured?: boolean; // Optional, as before
  createdDate?: { // From your JSON
    seconds: number;
    nanoseconds: number;
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartItemWithId extends CartItem {
  id: string; // Firestore document ID for the cart item
}