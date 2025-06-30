import { useEffect, useState } from "react";
import { Agent } from "./Agent";
import { useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Modal } from '../Modal';
import { AddOrEditAgentForm } from "./AddOrEditAgentForm";

export function Agents() {

  const [agents, setAgents] = useState([]);
  const { username } = useParams();
  const [addAgent, setAddAgent] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`http://localhost:3333/${username}/users/agents/all`,
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

  const handleAdd = async () => {
    try {
      const response = await fetch(`http://localhost:3333/${username}/users/agents/all`,
        {
          method: 'POST',
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

  return (
    <div>
      <PlusCircle onClick={setAddAgent(true)} />
      {addAgent && (
        <Modal onClose={() => setAddAgent(false)}>
          <AddOrEditAgentForm
            mode="add"
            onSubmit={handleAdd}
          />
        </Modal>
      )
      }
      {
        agents.length > 0 ? (
          <div>
            {agents.map((agent) => (
              <div className="agent-container" key={agent.user_id}>
                <Agent agent={agent} />
              </div>
            ))}
          </div>
        ) : (
          <p>No agents found.</p>
        )
      }
    </div >
  );
}