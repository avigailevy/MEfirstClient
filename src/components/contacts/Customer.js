import { useState } from 'react';
import { EditCusSuppForm } from '../EditCusSuppForm';


export function Customer({ customer }) {

    const [isEditing, setIsEditing] = useState(false);


    const deleteCustomer = async () => {
        try {
            const response = await fetch(`http://localhost:3333/contacts/customers/delete/${customer.user_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
        }
        catch (error) {
            console.error("Error deleting customer:", error);
        }
    }

    const updateCustomer = async (updatedData) => {
        try {
            const response = await fetch(`/update/${customer.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update customer');
            }
        }
        catch (error) {
            console.error("Error updating customer:", error);
        }
    }

    return (
        <>
            <div className="component-1">
                {/* delete */}
                <img className="trash-02" src="trash-02.svg" onClick={deleteCustomer} />
                {/* edit */}
                <img className="edit-02" src="edit-02.svg" onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditCusSuppForm
                        customer={customer}
                        onUpdate={updateCustomer}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div className="rectangle-20"></div>
                <div className="ellipse-19">{customer.profile_picture}</div>
                <div className="david-shalom">{customer.name}</div>
                <div className="frame-50">
                    <div className="frame-47">
                        <div className="company">Tel:</div>
                        <div className="ivory">{customer.phone}</div>
                    </div>
                    <div className="frame-48">
                        <div className="company">Mail:</div>
                        <div className="ivory">{customer.email}</div>
                    </div>
                    <div className="frame-49">
                        <div className="company">Adress:</div>
                        <div className="ivory">{customer.address}</div>
                    </div>
                </div>
                <img className="edit-02" src="edit-020.svg" />
                <img className="trash-02" src="trash-020.svg" />
                <img className="play-03" src="play-030.svg" />
            </div>

        </>
    );
}