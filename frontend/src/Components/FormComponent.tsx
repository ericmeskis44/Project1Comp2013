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
      </form>
    </div>
  );
}
