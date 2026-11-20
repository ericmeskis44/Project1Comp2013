interface AdjustQuantityCounterProps {
  quantity: number;
  userQuantity: number;
  id: number;
  handleAdjustQuantityCounter: (
    id: number,
    delta: number,
    quantity: number,
  ) => void;
}

export default function AdjustQuantityCounter({
  quantity,
  userQuantity,
  id,
  handleAdjustQuantityCounter,
}: AdjustQuantityCounterProps) {
  return (
    <div className="AdjustQuantityCounter">
      <button onClick={() => handleAdjustQuantityCounter(id, -1, quantity)}>
        {" - "}
      </button>
      <span>{userQuantity}</span>
      <button onClick={() => handleAdjustQuantityCounter(id, 1, quantity)}>
        {" + "}
      </button>
    </div>
  );
}
