import { useEffect, useState } from "react";
import { Product } from "./Product";
import { AddOrEditProductForm } from "./AddOrEditProductForm";
import { SearchAndFilter } from "../SearchAndFilter";
import { useParams } from "react-router-dom";

export function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const response = await fetch("http://localhost:3333/:userName/products", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    setProducts(data);
    console.log("Fetched products:", data);

  } catch (error) {
    console.error("Error fetching products:", error);
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
              <Product product={product}  />
            </div>
          ))}
        </div>
      ) : (
        <p>לא נמצאו מוצרים.</p>
      )}
    </div>
  );
}
