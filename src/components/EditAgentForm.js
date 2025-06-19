import React, { useState } from 'react';

export function EditAgentForm({ agent, onUpdate, onClose }) {
    const [formData, setFormData] = useState({
        name: agent.name,
        role: agent.role,
        phone: agent.phone,
        email: agent.email,
        address: agent.address,
        language: agent.language,
        birthdate: agent.birthdate,
        profile_picture: agent.profile_picture
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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <input type="text" name="role" value={formData.role} onChange={handleChange} />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                    <input type="text" name="language" value={formData.language} onChange={handleChange} />
                    <input type="text" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                    <input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleChange} />
                    <button type="submit">Update</button>
                    <button type="submit">שמור</button>
                </form>
            </div>
        </div>
    );
}