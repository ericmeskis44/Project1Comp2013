import type { ClothingProduct } from "../data/data";
import type { ItemsContainerProps, ItemsQuantity } from "./ThriftHappensApp";
import ItemCard from "./ItemCard";

export default function ItemsContainer({
  products,
  itemsQuantity,
  handleAdjustQuantityCounter,
  handleAddToCheckout,
  handleDeleteItem,
  handleEditItem
}: ItemsContainerProps) {
  return (
    <div className="ItemsContainer">
      {products.map((product: ClothingProduct) => {
        const itemQuantityObj: ItemsQuantity = itemsQuantity.find(
          (item) => item.id === product.id,
        ) || { id: -1, userQuantity: 0, remainQuantity: 0 };
        return (
          <ItemCard
            key={product.id}
            {...product}
            itemQuantity={itemQuantityObj.userQuantity}
            remainQuantity={itemQuantityObj.remainQuantity}
            handleAdjustQuantityCounter={handleAdjustQuantityCounter}
            handleAddToCheckout={handleAddToCheckout}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          />
        );
      })}
    </div>
  );
}
