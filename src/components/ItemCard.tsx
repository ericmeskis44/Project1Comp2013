import { useEffect, useState } from "react";
import type { Product } from "../types";

interface ItemCardProps {
    product: Product;
    onAddToCheckout: (productId: number, quantity: number) => void;
}

function ItemCard({ product, onAddToCheckout }: ItemCardProps) {
    const [itemQuantity, setItemQuantity] = useState(0);

    useEffect(() => {
        if (itemQuantity > product.quantity) {
            setItemQuantity(product.quantity);
        }
    }, [product.quantity, itemQuantity]);

    function decreaseQuantity() {
        setItemQuantity(previousQuantity =>
            Math.max(0, previousQuantity - 1)
        );
    }

    function increaseQuantity() {
        setItemQuantity(previousQuantity =>
            Math.min(product.quantity, previousQuantity + 1)
        );
    }

    function addItem() {
        if (itemQuantity <= 0 || itemQuantity > product.quantity) {
            return;
        }

        onAddToCheckout(product.id, itemQuantity);
        setItemQuantity(0);
    }

    return (
        <article className="item-card">
            <div className="item-image-container">
                <img
                    src={`/images/product-${product.id + 1}.png`} alt={product.name}
                    className="item-image"
                />

                {product.quantity === 0 && (
                    <span className="out-of-stock-label">
                        Out of Stock
                    </span>
                )}
            </div>

            <div className="item-details">
                <div className="item-heading">
                    <h3>{product.name}</h3>
                    <span className="item-price">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="item-description">
                    {product.description}
                </p>

                <div className="item-information">
                    <span>{product.category}</span>
                    <span>{product.size}</span>
                    <span>{product.color}</span>
                </div>

                <p className="item-stock">
                    Stock: {product.quantity}
                </p>

                <div className="item-actions">
                    <div className="quantity-counter">
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            disabled={itemQuantity === 0}
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>

                        <span>{itemQuantity}</span>

                        <button
                            type="button"
                            onClick={increaseQuantity}
                            disabled={itemQuantity >= product.quantity}
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>

                    <button
                        type="button"
                        className="add-button"
                        onClick={addItem}
                        disabled={product.quantity === 0 || itemQuantity === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ItemCard;