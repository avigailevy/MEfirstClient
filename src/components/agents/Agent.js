import { EditAgentForm } from "./EditAgentForm";
import { useState } from 'react';
import '../../css/ContactOrUser.css';
import { UserPen } from 'lucide-react';
import { Link, Outlet, useParams } from "react-router-dom";

export function Agent({ agent }) {

    const [isEditing, setIsEditing] = useState(false);
    const { username } = useParams();

    //לא בטוח שרוצים למחוק סוכן...
    // const deleteAgent = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3333/${username}/users/delete/${agent.user_id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'authorization': `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         );
    //         if (!response.ok) {
    //             throw new Error('Failed to delete agent');
    //         }
    //     }
    //     catch (error) {
    //         console.error("Error deleting agent:", error);
    //     }
    // }

    const updateAgent = async (updatedData) => {
        try {
            const response = await fetch(`/update/${agent.user_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error('Failed to update agent');
            }
        }
        catch (error) {
            console.error("Error updating agent:", error);
        }
    }
    return (
        <>
            <div className="component-1">
                <UserPen onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateAgent}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                <div className="ellipse-19">{agent.profile_picture}</div>
                <div className="david-shalom">{agent.username}</div>
                <div className="frame-50">
                    <div className="frame-47">
                        <div className="company">Tel:</div>
                        <div className="ivory">{agent.phone}</div>
                    </div>
                    <div className="frame-48">
                        <div className="company">Mail:</div>
                        <div className="ivory">{agent.email}</div>
                    </div>
                    <div className="frame-49">
                        <div className="company">Adress:</div>
                        <div className="ivory">{agent.address}</div>
                    </div>
                </div>
                <div className="frame-5">
                    <Link className="details" to={`/${username}/users/agents/${agent.username}/projects`}>Show projects</Link>
                    <Outlet />
                </div>
            </div>
        </>
    );

}