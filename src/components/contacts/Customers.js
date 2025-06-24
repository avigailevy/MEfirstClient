import { useEffect, useState } from "react";
import { Customer } from "./Customer";

export function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async (username) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3333/:username/contacts/customer/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer` + token,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div className="contact-container" key={customer.user_id}>
              <Customer customer={customer} />
            </div>
          ))}
        </div>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
}