import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import { Modal } from "../products/Modal";
import { Project } from "./Project";
import '../../css/Projects.css';
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";
import { Outlet, useParams } from "react-router-dom";
import { Link, PencilLine, Trash2 } from 'lucide-react';
import { NavigationBar } from '../homePage/NavigationBar'
import { useParams } from "react-router-dom";
import { AddOrEditProject } from "./AddOrEditProject";

export function Projects({ projectStatus }) {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('project_id');
  const [searchCriterion, setSearchCriterion] = useState('project_name');
  const [searchValue, setSearchValue] = useState('');

  const { user, isLoggedIn } = useAuth();
  const { username,agentName } = useParams();

  useEffect(() => {
    if (isLoggedIn) {
      agentName ? fetchProjectsForAdmin() : fetchProjects();
    }
  }, [isLoggedIn, agentName]);


  const fetchProjects = async () => {
    try {
      const res = await fetch(`http://localhost:3333/${username}/projects/${projectStatus}`, {
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
        <div>
            <NavigationBar/>
            <h3 className="projectsTitle">Projects Manager</h3>
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

            <form>
                <input
                    type="text"
                    placeholder="New project..."
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                />
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addProject();
                    }}
                >
                    +
                </button>
            </form>

            {filtered.length > 0 ? (
                <div>
                    {filtered.map((project) => (
                        <div className="project-container" key={project.project_id}>
                            <div className="component-1">
                                <div className="rectangle-20"></div>
                                <div className="david-shalom">{getCustomerOrSupplierName(project.customer_id, 'customer')}</div>
                                <div className="ellipse-19"></div>
                                <div className="frame-50">
                                    <div className="frame-46">
                                        <div className="company">Agent:</div>
                                        <div className="ivory">{getProjectOwnerName(project.owner_user_id)}</div>
                                    </div>
                                    <div className="frame-47">
                                        <div className="company">Supplier:</div>
                                        <div className="ivory">{getCustomerOrSupplierName(project.supplier_id, 'supplier')}</div>
                                    </div>
                                    <div className="frame-48">
                                        <div className="company">Product:</div>
                                        <div className="ivory">{getProductName(project.product_id)}</div>
                                    </div>
                                </div>
                                <PencilLine />
                                <Trash2 />
                                <div className="frame-5">
                                    <div className="frame-75"></div>
                                    {setValue(project.current_stage)}
                                    <div className="frame-76" style={{ width: `${percent}%` }}></div>
                                </div>
                                <div className="frame-5">
                                    <Link to={`/${username}/projects/open/display`}>Display Project</Link>
                                    <Outlet />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
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
            <Project
              key={project.project_id}
              project={project}
              onEdit={() => openEditForm(project)}
              onDelete={() => deleteProject(project.project_id)}
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}
