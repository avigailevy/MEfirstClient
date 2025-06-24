import { useState } from "react";
import { useParams } from "react-router-dom"; 

export function Product({ product, onUpdated, onEdit }) {
    const { username } = useParams();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3333/${username}/products/${product.product_id}`, {
        method: "DELETE",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error("Delete failed");
      onUpdated?.();
    } catch (error) {
      console.error("שגיאה במחיקת מוצר:", error);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.product_name}</h3>
      <p><strong>קטגוריה:</strong> {product.category}</p>
      <p><strong>תיאור:</strong> {product.description}</p>
      <p><strong>ספק:</strong> {product.supplier_id}</p>
      <div className="actions">
        <button onClick={onEdit}>ערוך</button>
        <button onClick={handleDelete} className="btn-danger">מחק</button>
      </div>
    </div>
  );
}
