import React from "react";

interface CheckoutCardProps {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  userQuantity: number;
  handleRemoveFromCheckout: (id: number) => void;
}
export default function CheckoutCard({
  id,
  name,
  price,
  userQuantity,
  image,
  handleRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <div className="CheckoutCardTitle">
        <h4>{name}</h4>
        <img src={image} alt="" width="40px" />
      </div>
      <div className="CheckoutCardBody">
        <p>Price: {price.toFixed(2)}$</p>
        <p>Quantity: {userQuantity}</p>
        <p>Total: {(userQuantity * price).toFixed(2)}$</p>
        <button onClick={() => handleRemoveFromCheckout(id)}>Remove</button>
      </div>
    </div>
  );
}
