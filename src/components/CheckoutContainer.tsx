import type { Product, CartItem } from "../types";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
    cart: CartItem[];
    products: Product[];
    grandTotal: number;
    onRemove: (productId: number) => void;
    onEmptyCheckout: () => void;
}

function CheckoutContainer({
    cart,
    products,
    grandTotal,
    onRemove,
    onEmptyCheckout
}: CheckoutContainerProps) {
    if (cart.length === 0) {
        return (
            <div className="empty-cart">
                <p>Cart Empty</p>
                <span>Your selected items will appear here.</span>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-items">
                {cart.map(cartItem => {
                    const product = products.find(
                        item => item.id === cartItem.productId
                    );

                    if (!product) {
                        return null;
                    }

                    return (
                        <CheckoutCard
                            key={cartItem.productId}
                            product={product}
                            quantity={cartItem.quantity}
                            onRemove={onRemove}
                        />
                    );
                })}
            </div>

            <div className="checkout-summary">
                <div className="grand-total">
                    <span>Grand Total</span>
                    <strong>${grandTotal.toFixed(2)}</strong>
                </div>

                <button
                    type="button"
                    className="empty-checkout-button"
                    onClick={onEmptyCheckout}
                >
                    Empty Checkout
                </button>
            </div>
        </div>
    );
}

export default CheckoutContainer;