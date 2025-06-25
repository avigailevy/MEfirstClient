import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import { Modal } from "../products/Modal";
import { AddOrEditProject } from "./AddOrEditProject";
import { Project } from "./Project";
import '../../css/Projects.css';
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";
import { Navigate, useParams } from "react-router-dom";
import { NavigationBar } from '../homePage/NavigationBar'
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";


export function Projects({ projectStatus }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('project_id');
  const [searchCriterion, setSearchCriterion] = useState('project_name');
  const [searchValue, setSearchValue] = useState('');
  const { user, isLoggedIn } = useAuth();
const navigate = useNavigate();



  const { username,agentName } = useParams();

useEffect(() => {
    if (isLoggedIn) {
      agentName ? fetchProjectsForAdmin() : fetchProjects();
    }
  }, [isLoggedIn, agentName]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3333/${username}/projects/${projectStatus}/all`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjectsForAdmin = async () => {
    try {
      const res = await fetch(`http://localhost:3333/${username}/projects/${projectStatus}/${agentName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error("Failed to fetch admin projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching admin projects:", error);
    }
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://localhost:3333/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(prev => prev.filter(p => p.project_id !== projectId));
    } catch (error) {
      alert("Error deleting project: " + error.message);
    }
  };

  const handleUpdated = () => {
    agentName ? fetchProjectsForAdmin() : fetchProjects();
    setShowForm(false);
    setEditingProject(null);
  };

  const openAddForm = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const filtered = FilterSomething(searchCriterion, SortSomething(projects, sortCriterion), searchValue);

  return (
    <div className="projects-page">
      <NavigationBar />
      <h3 className="projectsTitle">Projects Manager</h3>

      <SearchAndFilter
        sortCriterion={sortCriterion}
        setSortCriterion={setSortCriterion}
        searchCriterion={searchCriterion}
        setSearchCriterion={setSearchCriterion}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <button className="btn-add" onClick={openAddForm}>+</button>

      {showForm && (
        <Modal onClose={closeForm}>
          <AddOrEditProject
            project={editingProject}
            onSuccess={handleUpdated}
          />
        </Modal>
      )}

      <div className="projects-list">
        {filtered.length > 0 ? (
          filtered.map(project => (
            <div onClick={() => navigate(`/projects/${project.status}/${project.project_id}`)} key={project.project_id}>
              <Project                
                project={project}
                onEdit={() => openEditForm(project)}
                onDelete={() => deleteProject(project.project_id)}
              />
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <CirclePlus />
    </div>
  );
}
