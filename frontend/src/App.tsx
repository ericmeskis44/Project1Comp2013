import "./App.css";
import ThriftHappensApp from "./Components/ThriftHappensApp";
import { products } from "./data/data";

function App() {
  return (
    <>
      <ThriftHappensApp products={products} />
    </>
  );
}

export default App;
