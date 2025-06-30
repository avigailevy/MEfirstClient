import { useParams } from 'react-router-dom';
import { StageDisplay } from '../stages/StageDisplay';
import { Stages } from '../stages/Stages';
import { useEffect, useState } from 'react';
import { SummTextBox } from '../summaries/SummTextBox';

export function ProjectDisplay() {
  const { username, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [selectedStageId, setSelectedStageId] = useState(null);

  useEffect(() => {
    fetchProject();
    console.log("🧩 ProjectDisplay mounted!");
    return () => {
      console.log("🧩 ProjectDisplay unmounted!");
    };
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`http://localhost:3333/${username}/projects/single/${projectId}`, {
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

  if (!project) return <p>Loading project...</p>;

  return (
    <>
      project display
      {selectedStageId === null ? (
        <Stages
          projectId={projectId}
          username={username}
          onStageSelect={setSelectedStageId}
        />
      ) : (
        <>
          <button onClick={() => setSelectedStageId(null)}>חזור לרשימת השלבים</button>
          <StageDisplay
            username={username}
            projectId={projectId}
            stageId={selectedStageId}
          />
        </>
      )}

      <button > Show documents</button>
      <SummTextBox projectId={project.project_id} username={username} />
    </>
  );
}
