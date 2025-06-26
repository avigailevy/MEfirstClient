import { useEffect, useState } from "react";
import { Product } from "./Product";
import { AddOrEditProductForm } from "./AddOrEditProductForm";
import { SearchAndFilter } from "../SearchAndFilter";
import { Modal } from "../Modal";
import { Header } from '../homePage/Header';
import '../../css/Product.css';
import { useParams } from "react-router-dom";

export function Products({ fromProject }) {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { username } = useParams();

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
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdated = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const toggleChoosed = async (product) => {
    try {
      //הפונקציה צריכה לגשת לטבלת קשר בין פרוייקט ומוצר
      const res = await fetch(`http://localhost:3333/${username}/products/${product.product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        //
        body: JSON.stringify(),
      });
      if (!res.ok) throw new Error("Failed to toggle complete");
      // onUpdate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">

      <div className="main-content">
        <Header />
        <SearchAndFilter />
        <button onClick={openAddForm}>+</button>

        {showForm && (
          <Modal onClose={closeForm}>
            <AddOrEditProductForm
              product={editingProduct}
              onSuccess={handleUpdated}
            />
          </Modal>
        )}

        <div className="products-grid">
          {products.map(product => (
            <div>
              {fromProject && (<input
                type="checkbox"
                // checked={todo.completed}
                onChange={toggleChoosed}
              />)}
              <Product
                key={product.product_id}
                product={product}
                onUpdated={handleUpdated}
                onEdit={() => openEditForm(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
