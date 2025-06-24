import { useEffect, useState } from "react";
import { Supplier } from "./Supplier";
import { useAuth } from "../../context/AuthContext"

export function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.username) {
      fetchSuppliers(user.username);
    }
  }, [user]);

  const fetchSuppliers = async (uname) => {
    try {
      const response = await fetch(`http://localhost:3333/${uname}/contacts/supplier/all`);
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {suppliers.length > 0 ? (
        <div>
          {suppliers.map((supplier) => (
            <div className="contact-container" key={supplier.user_id}>
              <Supplier supplier={supplier} />
            </div>
          ))}
        </div>
      ) : (
        <p>No suppliers found.</p>
      )}
    </div>
  );
}