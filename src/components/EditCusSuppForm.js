import { useState } from 'react';
import '../css/EditAgentForm.css'; 

export function EditCusSuppForm({ contact, onUpdate, onClose }) {
    const [formData, setFormData] = useState({
        contact_name: contact.contact_name,
        contact_phone: contact.contact_phone,
        contact_email: contact.contact_email,
        company_name: contact.company_name,
        country: contact.country,
        address: contact.address,
        contact_type: contact.contact_type
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={formData.contact_name} onChange={handleChange} />
                    <input type="text" name="phone" value={formData.contact_phone} onChange={handleChange} />
                    <input type="text" name="email" value={formData.contact_email} onChange={handleChange} />
                    <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
                    <input type="text" name="country" value={formData.country} onChange={handleChange} />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    <input type="text" name="contact_type" value={formData.contact_type} onChange={handleChange} />
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}