import type { ClothingProduct } from "./data/data";

export type Product = ClothingProduct;

export interface CartItem {
    productId: number;
    quantity: number;
}