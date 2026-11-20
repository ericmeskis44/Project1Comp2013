import type { ClothingProduct } from "../data/data";
import AdjustQuantityCounter from "./AdjustQuantityCounter";

interface ItemCardProps extends ClothingProduct {
  remainQuantity: number;
  handleAdjustQuantityCounter: (
    id: number,
    delta: number,
    quantity: number,
  ) => void;
  handleAddToCheckout: (
    id: number,
    image: string,
    name: string,
    quantity: number,
    userQuantity: number,
    price: number,
  ) => void;
}

export default function ItemCard({
  id,
  name,
  fit,
  category,
  color,
  description,
  size,
  price,
  image,
  itemQuantity,
  remainQuantity,
  handleAdjustQuantityCounter,
  handleAddToCheckout,
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <h3>{name}</h3>
      <img src={image} alt="" width="100px" />
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>
        <b>Price:</b> {price.toFixed(2)}$
      </p>
      <p>
        <b>Quantity:</b> {remainQuantity}
      </p>
      <br />
      <div>
        <AdjustQuantityCounter
          userQuantity={itemQuantity}
          quantity={remainQuantity}
          id={id}
          handleAdjustQuantityCounter={handleAdjustQuantityCounter}
        />
        <br />
        <button
          onClick={() =>
            handleAddToCheckout(
              id,
              image,
              name,
              remainQuantity,
              itemQuantity,
              price,
            )
          }
          disabled={remainQuantity <= 0}
        >
          {remainQuantity > 0 ? `Add to Checkout` : `Out of Stock`}
        </button>
      </div>
    </div>
  );
}
