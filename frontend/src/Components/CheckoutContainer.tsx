import CheckoutCard from "./CheckoutCard";
import type { CheckoutItem, CheckoutContainerProps } from "./ThriftHappensApp";

export default function CheckoutContainer({
  checkoutItems,
  checkoutTotal,
  handleRemoveFromCheckout,
  handleEmptyCheckout,
}: CheckoutContainerProps) {
  return (
    <div>
      <div className="CheckoutContainer">
        <h2>{checkoutItems.length === 0 ? "Cart Empty" : "Cart"}</h2>
        {checkoutItems.map((item: CheckoutItem) => (
          <CheckoutCard
            key={item.id}
            {...item}
            handleRemoveFromCheckout={handleRemoveFromCheckout}
          />
        ))}
        {checkoutItems.length > 0 && (
          <div>
            <button onClick={() => handleEmptyCheckout()}>
              Empty Checkout
            </button>
            <h2>Total: {checkoutTotal.toFixed(2)}$</h2>
          </div>
        )}
      </div>
    </div>
  );
}
