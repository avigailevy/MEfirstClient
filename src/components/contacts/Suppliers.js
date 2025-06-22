import { useEffect, useState } from "react";
import { Supplier } from "./Supplier";

export function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = async () => {
    try{
        const response = await fetch('http://localhost:3333/contacts/supplier/all');
        if(!response.ok) throw new Error('Failed to fetch suppliers');
        const data = await response.json();
        setSuppliers(data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
        {suppliers.length > 0 ? (
            <div>
                {suppliers.map((supplier) => (
                    <div className="contact-container" key={supplier.user_id}>
                        <Supplier  supplier={supplier} />
                    </div>
                ))}
            </div>
        ) : (
            <p>No suppliers found.</p>
        )}
    </div>
  );
}