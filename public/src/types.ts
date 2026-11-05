import type {
    Fit,
    ClothingCategory,
    ClothingSize
} from "./data/data";

export interface Product {
    id: number;
    name: string;
    image: string;
    fit: Fit;
    category: ClothingCategory;
    color: string;
    description: string;
    size: ClothingSize;
    price: number;
    quantity: number;
    itemQuantity: number;
}

export interface CartItem {
    productId: number;
    quantity: number;
}