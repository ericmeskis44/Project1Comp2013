import type { Product } from "../types";

interface CheckoutCardProps {
    product: Product;
    quantity: number;
    onRemove: (productId: number) => void;
}

function CheckoutCard({
    product,
    quantity,
    onRemove
}: CheckoutCardProps) {
    const subtotal = product.price * quantity;

    return (
        <article className="checkout-card">
            <img
                src={`/images/product-${product.id + 1}.png`}
                alt={product.name}
                className="checkout-image"
            />

            <div className="checkout-item-details">
                <h3>{product.name}</h3>

                <p>
                    ${product.price.toFixed(2)} each
                </p>

                <p>
                    Quantity: {quantity}
                </p>

                <strong>
                    Subtotal: ${subtotal.toFixed(2)}
                </strong>
            </div>

            <button
                type="button"
                className="remove-button"
                onClick={() => onRemove(product.id)}
            >
                Remove
            </button>
        </article>
    );
}

export default CheckoutCard;