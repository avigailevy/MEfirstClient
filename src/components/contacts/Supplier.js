import { useState } from 'react';
import { EditCusSuppForm } from '../EditCusSuppForm';
import { Trash, Pencil } from 'lucide-react';

export function Supplier({ supplier }) {

    const [isEditing, setIsEditing] = useState(false);

    const deleteSupplier = async () => {
        try {
            const response = await fetch(`http://localhost:3333/contacts/suppluers/delete/${supplier.user_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete supplier');
            }
        }
        catch (error) {
            console.error("Error deleting supplier:", error);
        }
    }

    const updateSupplier = async (updatedData) => {
        try {
            const response = await fetch(`/update/${supplier.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update supplier');
            }
        }
        catch (error) {
            console.error("Error updating supplier:", error);
        }
    }

    return (
        <>
            <div className="component-1">
                <Trash onClick={deleteSupplier} />
                <Pencil onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditCusSuppForm
                        supplier={supplier}
                        onUpdate={updateSupplier}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div className="rectangle-20"></div>
                <div className="ellipse-19">{supplier.profile_picture}</div>
                <div className="david-shalom">{supplier.name}</div>
                <div className="frame-50">
                    <div className="frame-47">
                        <div className="company">Tel:</div>
                        <div className="ivory">{supplier.phone}</div>
                    </div>
                    <div className="frame-48">
                        <div className="company">Mail:</div>
                        <div className="ivory">{supplier.email}</div>
                    </div>
                    <div className="frame-49">
                        <div className="company">Adress:</div>
                        <div className="ivory">{supplier.address}</div>
                    </div>
                </div>
            </div>

        </>
    );
}