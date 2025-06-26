import { useParams } from "react-router-dom"; 
import { Trash2, UserPen } from 'lucide-react';
import '../../css/ContactOrUser.css';

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
   <div className="component-1">
       <UserPen onClick={onEdit} />
        <Trash2 onClick={handleDelete} />
          
                <div className="ellipse-19">{}</div>
                <div className="david-shalom">{product.product_name}</div>
                <div className="frame-50">
                    <div className="frame-47">
                        <div className="company">category:</div>
                        <div className="ivory">{product.category}</div>
                    </div>
                    <div className="frame-48">
                        <div className="company">description:</div>
                        <div className="ivory">{product.description}</div>
                    </div>
                    <div className="frame-49">
                        <div className="company">supplier:</div>
                        <div className="ivory">{product.supplier_id}</div>
                    </div>
                </div>
                         
            </div>

  );
}

