import type { FormComponentProps } from "./ThriftHappensApp";
import type { Fit, ClothingCategory, ClothingSize } from "../data/data";

const fit: Fit[] = ["men", "women", "kids"];
const clothingCategory: ClothingCategory[] = [
  "hoodie",
  "pants",
  "shirt",
  "shorts",
  "t-shirt",
];
const clothingSize: ClothingSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

export default function FormComponent({
  clothesArticle,
  responseMessage,
  handleOnSubmit,
  handleOnChange,
}: FormComponentProps) {
  return (
    <div>
      <form action="" onSubmit={handleOnSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          id="name"
          value={clothesArticle.name}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="image">Image: </label>
        <input
          type="text"
          name="image"
          id="image"
          value={clothesArticle.image}
          onChange={handleOnChange}
        />

        <br />
        <label htmlFor="fit">Fit: </label>
        <select
          name="fit"
          id="fit"
          value={clothesArticle.fit}
          onChange={handleOnChange}
        >
          {fit.map((fit) => (
            <option key={fit} value={fit}>
              {fit}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          id="category"
          value={clothesArticle.category}
          onChange={handleOnChange}
        >
          {clothingCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br/>
        <label htmlFor="color">Colour: </label>
        <input
          type="text"
          name="color"
          id="color"
          value={clothesArticle.color}
          onChange={handleOnChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={clothesArticle.description}
          onChange={handleOnChange}
        ></textarea>
        <br />
        <label htmlFor="size">Size:</label>
        <select
          name="size"
          id="size"
          value={clothesArticle.size}
          onChange={handleOnChange}
        >
          {clothingSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          value={clothesArticle.price}
          onChange={handleOnChange}
          min="0"
          step="0.5"
        />
      
      <br />
      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        name="quantity"
        id="quantity"
        value={clothesArticle.quantity}
        onChange={handleOnChange}
        min={0}
      />
      <br/>
    <button>Submit</button>
  </form>
  <p>{responseMessage}</p>
  </div>
  );
}
