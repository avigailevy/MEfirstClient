import { useState } from 'react';
import '../../css/EditAgentForm.css';

export function EditAgentForm({ agent, onUpdate, onClose }) {
    const [formData, setFormData] = useState({
        name: agent.username,
        role: agent.role,
        phone: agent.phone,
        email: agent.email,
        address: agent.address,
        language: agent.language,
        birthdate: agent.birthdate,
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
                    <label>
                        <div>Username:</div>                         
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <div>Role:</div>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            readOnly
                        />
                    </label>

                    <label>
                        <div>Phone:</div>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <div>Email:</div>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <div>Adress:</div>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        <div>Language:</div>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                        >
                            <option value="en">en</option>
                            <option value="he">he</option>
                        </select>
                    </label>

                    <button type="submit">Update</button>
                </form>

            </div>
        </div>
    );
}