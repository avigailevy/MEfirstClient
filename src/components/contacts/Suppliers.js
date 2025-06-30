import { useEffect, useState } from "react";
import { Supplier } from "./Supplier";
import { CirclePlus } from "lucide-react";

export function Suppliers() {

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);


  const fetchSuppliers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:3333/:userName/contacts/suppliers", {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to fetch Suppliers");

      const data = await response.json();
      setSuppliers(data);
      console.log("Fetched Suppliers:", data);

    } catch (error) {
      console.error("Error fetching Suppliers:", error);
    }
  };


  return (
    <div className="contacts-container" >
      {suppliers.length > 0 ? (
        <div className="contacts-container" >
          <CirclePlus />
          {suppliers.map((supplier) => (
            <div key={supplier.user_id}>
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