import { useEffect, useState } from "react";
import { Customer } from "./Customer";
import { useParams } from "react-router-dom";
import '../../css/ContactOrUser.css';

export function Customers() {

  const [customers, setCustomers] = useState([]);
    const { username } = useParams();


  useEffect(() => {
    fetchCustomers();
  }, []);
   
  
  

  const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const response = await fetch(`http://localhost:3333/${username}/contacts/customers`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Failed to fetch customers");

    const data = await response.json();
    setCustomers(data);
    console.log("Fetched customers:", data);

  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};


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