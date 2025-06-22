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
            <div class="component-1">
                {/* delete */}
                <img class="trash-02" src="trash-02.svg" onClick={deleteAgent} />
                {/* edit */}
                <img class="edit-02" src="edit-02.svg" onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateAgent}
                        onClose={() => setIsEditing(false)}
                    />
                )}
                {/* frame */}
                <div class="rectangle-20"></div>
                <div class="ellipse-19">{agent.profile_picture}</div>
                <div class="david-shalom">{agent.name}</div>
                <div class="frame-50">
                    <div class="frame-47">
                        <div class="company">Tel:</div>
                        <div class="ivory">{agent.phone}</div>
                    </div>
                    <div class="frame-48">
                        <div class="company">Mail:</div>
                        <div class="ivory">{agent.email}</div>
                    </div>
                    <div class="frame-49">
                        <div class="company">Adress:</div>
                        <div class="ivory">{agent.address}</div>
                    </div>
                </div>
                <img class="edit-02" src="edit-020.svg" />
                <img class="trash-02" src="trash-020.svg" />
                <div class="frame-5">
                    <div class="details" onClick={() => { showAgentProjects }}>Show projects</div>
                </div>
                <img class="play-03" src="play-030.svg" />
            </div>

        </>
    );
}