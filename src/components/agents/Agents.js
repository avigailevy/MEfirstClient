import { useEffect, useState } from "react";
import { Agent } from "./Agent";
import { NavigationBar } from '../homePage/NavigationBar'

export function Agents() {

  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:3333/:username/users/agents/all',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'authorizeRoles': 'admin',
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch agents');
      const data = await response.json();
      setAgents(data);
      console.log(agents);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div>
      <NavigationBar/>
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