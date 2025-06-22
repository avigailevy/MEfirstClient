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
      const confirmed = window.confirm("האם את בטוחה שברצונך למחוק את המוצר?");
      if (!confirmed) return;

      const response = await fetch(`http://localhost:3333/username/products/${product.product_id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Delete failed");
      onUpdated?.();
    } catch (error) {
      console.error("שגיאה במחיקת מוצר:", error);
    }
  };

  if (isEditing) {
    return <AddOrEditProductForm product={product} onSuccess={handleSuccess} />;
  }

  return (
    <div className="component-11">
      <div className="rectangle-20"></div>
      <div className="david-shalom">{product.product_name}</div>
      <div className="ellipse-19"></div>
      <div className="frame-50">
        <div className="frame-46">
          <div className="company">קטגוריה:</div>
          <div className="ivory">{product.category}</div>
        </div>
        <div className="frame-47">
          <div className="company">תיאור:</div>
          <div className="ivory">{product.description}</div>
        </div>
        <div className="frame-48">
          <div className="company">ספק:</div>
          <div className="ivory">{product.supplier_id}</div>
        </div>
      </div>

      <img
        className="edit-02"
        src="edit-020.svg"
        alt="ערוך"
        onClick={() => setIsEditing(true)}
        style={{ cursor: "pointer" }}
      />
      <img
        className="trash-02"
        src="trash-020.svg"
        alt="מחק"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
      <div className="frame-5">
        <div className="details">Show projects</div>
      </div>
    </div>
  );
}
