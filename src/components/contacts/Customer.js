import { useState } from 'react';

export function Customer({ customer }) {

    const [isEditing, setIsEditing] = useState(false);

    const showCustomerProjects = () => {
        return (
            <Projects userId={customer.user_id} />
        );
    }

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
            <div class="component-1">
                {/* delete */}
                <img class="trash-02" src="trash-02.svg" onClick={deleteCustomer} />
                {/* edit */}
                <img class="edit-02" src="edit-02.svg" onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateCustomer}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div class="rectangle-20"></div>
                <div class="ellipse-19">{customer.profile_picture}</div>
                <div class="david-shalom">{customer.name}</div>
                <div class="frame-50">
                    <div class="frame-47">
                        <div class="company">Tel:</div>
                        <div class="ivory">{customer.phone}</div>
                    </div>
                    <div class="frame-48">
                        <div class="company">Mail:</div>
                        <div class="ivory">{customer.email}</div>
                    </div>
                    <div class="frame-49">
                        <div class="company">Adress:</div>
                        <div class="ivory">{customer.address}</div>
                    </div>
                </div>
                <img class="edit-02" src="edit-020.svg" />
                <img class="trash-02" src="trash-020.svg" />
                <div class="frame-5">
                    <div class="details" onClick={() => { showCustomerProjects }}>Show projects</div>
                </div>
                <img class="play-03" src="play-030.svg" />
            </div>

        </>
    );
}