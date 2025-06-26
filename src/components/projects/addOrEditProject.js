import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function AddOrEditProject({ project, onSuccess }) {
  const [title, setTitle] = useState(project ? project.project_name : '');
  const { username } = useParams();

  useEffect(() => {
    if (project) {
      setTitle(project.project_name);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = project ? 'PUT' : 'POST';
    const url = project == 'PUT'
      ? `http://localhost:3333/projects/${project.project_id}`
      : `http://localhost:3333/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ project_name: title }),
      });
      if (!res.ok) throw new Error("Failed to save project");
      onSuccess();
      if (method == 'POST') {
        createFolderForProjectDocs();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const createFolderForProjectDocs = async () => {
    try {
      await fetch(`http://localhost:3333/${username}/documents/newFolder`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${}`,
          parentName: 'abc123def456'
        }),
      })
    } catch (error) {
            console.error("Error creating a folder:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Project name"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <button type="submit">{project ? "Update" : "Add"}</button>
    </form>
  );
}
