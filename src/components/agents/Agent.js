import { EditAgentForm } from "../EditAgentForm";
import { Project } from "../projects/Project";
import React, { useState } from 'react';
import '../../css/ContactOrUser.css'; 

export function Agent({ agent }) {

    const [isEditing, setIsEditing] = useState(false);

    const showAgentProjects = () => {
        return (
            <Project agentId={agent.user_id} />
        );
    }

    const deleteAgent = async () => {
        try {
            const response = await fetch(`http://localhost:3333/users/delete/${agent.user_id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete agent');
            }
        }
        catch (error) {
            console.error("Error deleting agent:", error);
        }
    }

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
                {/* delete */}
                <img className="trash-02" src="trash-02.svg" onClick={deleteAgent} />
                {/* edit */}
                <img className="edit-02" src="edit-02.svg" onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateAgent}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div className="rectangle-20"></div>
                <div className="ellipse-19">{agent.profile_picture}</div>
                <div className="david-shalom">{agent.name}</div>
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
                <img className="edit-02" src="edit-020.svg" />
                <img className="trash-02" src="trash-020.svg" />
                <div className="frame-5">
                    <div className="details" onClick={() => showAgentProjects }>Show projects</div>
                </div>
                <img className="play-03" src="play-030.svg" />
            </div>

        </>
    );
}