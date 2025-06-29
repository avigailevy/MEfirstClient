import { useParams } from 'react-router-dom';
import { StageDisplay } from '../stages/StageDisplay'
import { Stages } from '../stages/Stages'
import { useEffect, useState } from 'react';
import { Header } from '../homePage/Header'
import { TextBox } from '../summaries/TextBox'

export function ProjectDisplay() {
  const { username, projectId } = useParams();
  const [project, setProject] = useState("כככככ");

  useEffect(() => {
    fetchProject();
    console.log("🧩 ProjectDisplay mounted!");
    return () => {
      console.log("🧩 ProjectDisplay unmounted!");
    };
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://localhost:3333/${username}/projects/${projectId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Failed to fetch project");

      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };
if (!project || !project.project_id) return <p>Loading project...</p>;

  return (
    <>project display
     <StageDisplay/>
      <Header title={project} />
      <Stages projectId={project.id} />
      <input type='button'>Summaries</input>
      <input type='button'>Documents</input>
      <TextBox projectId={project.id} username={username}/>
    </>
  );
}