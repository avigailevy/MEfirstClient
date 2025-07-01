import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { ContactForm } from './ContactForm';

export function ContactCard({ contact, username, onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/${username}/contacts/${contact.contact_type}s/delete/${contact.contact_name}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      onDeleted(contact.contact_id);
    } else {
      const error = await res.text();
      console.error("Delete failed:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3333/${username}/contacts/${contact.contact_type}/update/${contact.contact_name}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (res.ok) {
      setIsEditing(false);
      onUpdated();
    } else {
      const error = await res.text();
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="contact-card">
      <Trash onClick={handleDelete} />
      <Pencil onClick={() => setIsEditing(true)} />
      {isEditing && (
  <ContactForm
    contact={contact}
    onSave={handleUpdate}
    onClose={() => setIsEditing(false)}
    type={contact.contact_type} // ← שדה קיים באובייקט, והוא כבר customer/supplier
  />
)}
      <h3>{contact.contact_name}</h3>
      <p>Phone: {contact.contact_phone}</p>
      <p>Email: {contact.contact_email}</p>
      <p>Address: {contact.address}</p>
    </div>
  );
}
