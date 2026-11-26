import { useEffect, useState, type SubmitEvent, type ChangeEvent } from "react";
import type { ClothingProduct } from "../data/data";
import ItemsContainer from "./ItemsContainer";
import NavBar from "./NavBar";
import CheckoutContainer from "./CheckoutContainer";
import axios from "axios";
import FormComponent from "./FormComponent";

// interface ThriftHappensAppProps {
//   products: ClothingProduct[];
// }

export interface ItemsContainerProps {
  products: ClothingProduct[];
  itemsQuantity: ItemsQuantity[];
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
  handleDeleteItem: (id: number) => void;
  handleEditItem: (id: number) => void;
}

export interface ItemsQuantity {
  id: number;
  userQuantity: number;
  remainQuantity: number;
}

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  userQuantity: number;
  quantity: number;
  image: string;
}

export interface CheckoutContainerProps {
  checkoutItems: CheckoutItem[];
  checkoutTotal: number;
  handleRemoveFromCheckout: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export interface FormComponentProps {
  clothesArticle: ClothingProduct;
  responseMessage: string;
  handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ThriftHappensApp() {
  const [products, setProducts] = useState<ClothingProduct[]>([]);
  const [itemsQuantity, setItemsQuantity] = useState<ItemsQuantity[]>([]);
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [clothesArticle, setClothesArticle] = useState<ClothingProduct>({
    id: -1,
    name: "",
    image: "",
    fit: "men",
    category: "hoodie",
    size: "M",
    color: "",
    description: "",
    price: 0,
    quantity: 0,
    itemQuantity: 0,
  });

  async function getProductsFromDB() {
    try {
      const { data } = await axios.get("http://localhost:3000/data");
      setProducts(data);
      setItemsQuantity(
        data.map((product: ClothingProduct) => ({
          id: product.id,
          userQuantity: 0,
          remainQuantity: product.quantity,
        })),
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getProductsFromDB() {
      try {
        const { data } = await axios.get("http://localhost:3000/data");
        setProducts(
          data.sort((a: ClothingProduct, b: ClothingProduct) => b.id - a.id),
        );
        setItemsQuantity(
          data.map((product: ClothingProduct) => ({
            id: product.id,
            userQuantity: 0,
            remainQuantity: product.quantity,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    }
    getProductsFromDB();
  }, []);

  function handleAdjustQuantityCounter(
    id: number,
    delta: number,
    remainQuantity: number,
  ) {
    setItemsQuantity((prevData) =>
      prevData.map((prev) =>
        prev.id === id
          ? {
              ...prev,
              userQuantity: Math.max(
                prev.userQuantity + delta <= remainQuantity
                  ? prev.userQuantity + delta
                  : prev.userQuantity,
                0,
              ),
              remainQuantity: Math.max(
                prev.remainQuantity - delta <= remainQuantity
                  ? prev.remainQuantity - delta
                  : prev.remainQuantity,
                0,
              ),
            }
          : { ...prev },
      ),
    );
  }

  function handleAddToCheckout(
    id: number,
    image: string,
    name: string,
    quantity: number,
    userQuantity: number,
    price: number,
  ) {
    setCheckoutItems((prevCheckout) => {
      const exists = prevCheckout.some((item) => item.id === id);

      if (exists) {
        return prevCheckout.map((item) =>
          item.id === id
            ? { ...item, userQuantity: item.userQuantity + userQuantity }
            : item,
        );
      }

      return [
        ...prevCheckout,
        { id, image, name, quantity, userQuantity, price },
      ];
    });
    setItemsQuantity((prevItems) =>
      prevItems.map((prev) =>
        prev.id === id
          ? {
              ...prev,
              userQuantity: 0,
              remainQuantity: prev.remainQuantity - prev.userQuantity,
            }
          : { ...prev },
      ),
    );
  }

  function handleRemoveFromCheckout(id: number) {
    setCheckoutItems((prevItems) => prevItems.filter((item) => item.id !== id));
    const originalProduct = products.find((prod) => prod.id === id);
    if (!originalProduct) return;
    setItemsQuantity((prevItems) => {
      return prevItems.map((item) =>
        item.id === id
          ? { ...item, remainQuantity: originalProduct.quantity }
          : { ...item },
      );
    });
  }

  function handleEmptyCheckout() {
    setItemsQuantity(
      products.map((prod) => ({
        id: prod.id,
        userQuantity: 0,
        remainQuantity: prod.quantity,
      })),
    );
    setCheckoutItems([]);
  }

  const checkoutTotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.userQuantity,
    0,
  );

  function handleOnChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    const numericFields = ["id", "price", "quantity", "itemQuantity"];

    setClothesArticle((prevArticle) => ({
      ...prevArticle,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  }

  async function handleOnSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // if the input on the form is a brand new article
    // use the post route to create a new article
    if (clothesArticle.id === -1) {
      try {
        await axios
          .post("http://localhost:3000/data", {
            ...clothesArticle,
            id: parseInt((Math.random() * 10000 + 50).toFixed(0)),
          })
          .then((response) => setResponseMessage(response.data.message));
        await getProductsFromDB();
        setClothesArticle({
          id: -1,
          name: "",
          image: "",
          fit: "men",
          category: "hoodie",
          size: "M",
          color: "",
          description: "",
          price: 0,
          quantity: 0,
          itemQuantity: 0,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios
          .patch(`http://localhost:3000/data/${clothesArticle.id}`, clothesArticle)
          .then((response) => setResponseMessage(response.data.message))
          .then(() => getProductsFromDB());
          setClothesArticle({
          id: -1,
          name: "",
          image: "",
          fit: "men",
          category: "hoodie",
          size: "M",
          color: "",
          description: "",
          price: 0,
          quantity: 0,
          itemQuantity: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleDeleteItem(id: number) {
    try {
      await axios
        .delete(`http://localhost:3000/data/${id}`)
        .then((response) => setResponseMessage(response.data.message))
        .then(() => getProductsFromDB());
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditItem(id: number) {
    const itemToEdit: ClothingProduct = products.find(
      (item) => item.id === id,
    ) || { ...clothesArticle };
    if (!itemToEdit) {
      throw new Error(`Product with id ${id} has not been found`);
    }
    setClothesArticle({ ...itemToEdit });
  }

  return (
    <div>
      <NavBar />
      <div className="MainAppBody">
        <ItemsContainer
          products={products}
          itemsQuantity={itemsQuantity}
          handleAdjustQuantityCounter={handleAdjustQuantityCounter}
          handleAddToCheckout={handleAddToCheckout}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        />
        <CheckoutContainer
          checkoutItems={checkoutItems}
          checkoutTotal={checkoutTotal}
          handleRemoveFromCheckout={handleRemoveFromCheckout}
          handleEmptyCheckout={handleEmptyCheckout}
        />
        <FormComponent
          clothesArticle={clothesArticle}
          responseMessage={responseMessage}
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
        />
      </div>
    </div>
  );
}
