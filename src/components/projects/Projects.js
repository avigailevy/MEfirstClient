import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import { Modal } from "../Modal";
import { AddOrEditProject } from "./AddOrEditProject";
import { Project } from "./Project";
import '../../css/Projects.css';
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CirclePlus, Eye } from "lucide-react";


export function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('project_id');
  const [searchCriterion, setSearchCriterion] = useState('project_name');
  const [searchValue, setSearchValue] = useState('');
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const { username, agentName, projectStatus } = useParams();
  console.log("Username:", username, "Agent Name:", agentName, "Project Status:", projectStatus);


  useEffect(() => {
    console.log(typeof agentName);
    if (typeof agentName !== 'undefined') {
      fetchAagentProjects();
    } else {
      fetchProjects();
    }
  }, [username,projectStatus, agentName]);

  const fetchAagentProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3333/${username}/projects/${agentName}`, {
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


  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`http://localhost:3333/${username}/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) throw new Error("Failed to delete project");
      console.log(`deleted successfully`);

      setProjects(prev => prev.filter(p => p.project_id !== projectId));
    } catch (error) {
      alert("Error deleting project: " + error.message);
    }
  };

  const handleUpdated = () => {
    fetchProjects();
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

      <h3 className="projectsTitle">Projects Manager</h3>

      <SearchAndFilter
        sortCriterion={sortCriterion}
        setSortCriterion={setSortCriterion}
        searchCriterion={searchCriterion}
        setSearchCriterion={setSearchCriterion}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <CirclePlus className="btn-add" onClick={openAddForm} />

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
          filtered.map((project) => (
            <div key={project.project_id} className="project-card-wrapper">
              <Project
                project={project}
                onEdit={() => openEditForm(project)}
                onDelete={() => deleteProject(project.project_id)}
              />
              <div
                className="project-show-details"
                onClick={() => navigate(`/${username}/projects/projectDisplay/${project.project_id}`)}>
                {console.log("👁️ Navigating to:", `/${username}/projects/projectDisplay/${project.project_id}`)}
                <Eye className="eye-icon"/>
                Show details
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>

    </div>
  );
}

