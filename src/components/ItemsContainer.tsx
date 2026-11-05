import type { Product } from "../types";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
    products: Product[];
    onAddToCheckout: (productId: number, quantity: number) => void;
}

function ItemsContainer({
    products,
    onAddToCheckout
}: ItemsContainerProps) {
    return (
        <div className="items-container">
            {products.map(product => (
                <ItemCard
                    key={product.id}
                    product={product}
                    onAddToCheckout={onAddToCheckout}
                />
            ))}
        </div>
    );
}

export default ItemsContainer;