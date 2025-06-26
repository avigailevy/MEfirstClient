import { useState, useEffect } from "react";

export function AddOrEditProject({ project, onSuccess }) {
  const [title, setTitle] = useState(project ? project.project_name : '');

  useEffect(() => {
    if (project) {
      setTitle(project.project_name);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = project ? 'PUT' : 'POST';
    const url = project
      ? `http://localhost:3333/projects/${project.project_id}`
      : `http://localhost:3333/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ project_name: title }),
      });
      if (!res.ok) throw new Error("Failed to save project");
      onSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

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
