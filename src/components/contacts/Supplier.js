import { useState } from 'react';

export function Supplier({ supplier }) {

    const [isEditing, setIsEditing] = useState(false);

    const showSupplierProjects = () => {
        return (
            <Projects userId={supplier.user_id} />
        );
    }

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
            <div class="component-1">
                {/* delete */}
                <img class="trash-02" src="trash-02.svg" onClick={deleteSupplier} />
                {/* edit */}
                <img class="edit-02" src="edit-02.svg" onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateSupplier}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div class="rectangle-20"></div>
                <div class="ellipse-19">{supplier.profile_picture}</div>
                <div class="david-shalom">{supplier.name}</div>
                <div class="frame-50">
                    <div class="frame-47">
                        <div class="company">Tel:</div>
                        <div class="ivory">{supplier.phone}</div>
                    </div>
                    <div class="frame-48">
                        <div class="company">Mail:</div>
                        <div class="ivory">{supplier.email}</div>
                    </div>
                    <div class="frame-49">
                        <div class="company">Adress:</div>
                        <div class="ivory">{supplier.address}</div>
                    </div>
                </div>
                <img class="edit-02" src="edit-020.svg" />
                <img class="trash-02" src="trash-020.svg" />
                <div class="frame-5">
                    <div class="details" onClick={() => { showSupplierProjects }}>Show projects</div>
                </div>
                <img class="play-03" src="play-030.svg" />
            </div>

        </>
    );
}