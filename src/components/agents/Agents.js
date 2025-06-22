import { useEffect, useState } from "react";
import { Agent } from "./Agent";

export function Agents() {

  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try{
        const response = await fetch('http://localhost:3333/users/agents/all');
        if(!response.ok) throw new Error('Failed to fetch agents');
        const data = await response.json();
        setAgents(data);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      {agents.length > 0 ? (
                <div>
                    {agents.map((agent) => (
                        <div className="agent-container" key={agent.user_id}>
                            <Agent agent={agent} />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No agents found.</p>
            )}
    </div>
  );
}