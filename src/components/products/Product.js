import { useState } from "react";
import { AddOrEditProductForm } from "./AddOrEditProductForm";

export function Product({ product, onUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSuccess = () => {
    setIsEditing(false);
    onUpdated?.();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3333/products/${product.product_id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Delete failed");
      onUpdated?.(); // רענון רשימה לאחר מחיקה
    } catch (error) {
      console.error("שגיאה במחיקת מוצר:", error);
    }
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <AddOrEditProductForm product={product} onSuccess={handleSuccess} />
      ) : (
        <>
          <h3>{product.product_name}</h3>
          <p><strong>קטגוריה:</strong> {product.category}</p>
          <p><strong>תיאור:</strong> {product.description}</p>
          <p><strong>ספק:</strong> {product.supplier_id}</p>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>ערוך</button>
            <button onClick={handleDelete} style={{ backgroundColor: "#dc3545" }}>
              מחק
            </button>
          </div>
        </>
      )}
    </div>
  );
}
