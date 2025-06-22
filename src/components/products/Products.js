import { useEffect, useState } from "react";
import { Product } from "./Product";
import { AddOrEditProductForm } from "./AddOrEditProductForm";
import { SearchAndFilter } from "../SearchAndFilter";

export function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3333/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <SearchAndFilter />
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "cancel" : "add"}
      </button>

      {showForm && <AddOrEditProductForm onSuccess={fetchProducts} />}

      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div className="product-container" key={product.product_id}>
              <Product product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p>לא נמצאו מוצרים.</p>
      )}
    </div>
  );
}
