import { EditAgentForm } from "../EditAgentForm";
import { Projects } from "../projects/Projects";
import { useEffect, useState } from 'react';
import '../../css/ContactOrUser.css';
import { Trash2, UserPen } from 'lucide-react';
import { useParams } from "react-router-dom";

export function Agent({ agent }) {

    const [isEditing, setIsEditing] = useState(false);
    const [agentProjects, setAgentProjects] = useState();
    const { username } = useParams();

    useEffect(() => {
        if (agentProjects > 0) {
            showAgentProjects();
        }
    }, [agentProjects]);

    const fetchAgentProjects = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3333/${username}/projects/open/${agent.user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error("Failed to fetch project");
            const data = await res.json();
            setAgentProjects(data);
            console.log('data',data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const showAgentProjects = () => {
        return (
            <>
                {agentProjects.map((project) => (<div id={agent.user_id}><Projects agentId={agent.user_id} projectStatus={'open'} /></div>))}
            </>
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
                <Trash2 onClick={deleteAgent} />
                <UserPen onClick={() => setIsEditing(true)} />
                {isEditing && (
                    <EditAgentForm
                        agent={agent}
                        onUpdate={updateAgent}
                        onClose={() => setIsEditing(false)}
                    />
                )}
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
                <div className="frame-5">
                    <div className="details" onClick={fetchAgentProjects}>Show projects</div>
                </div>
            </div>
        </>
    );

}