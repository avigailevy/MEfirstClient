import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import { Modal } from "../Modal";
import { AddOrEditProject } from "./AddOrEditProject";
import { Project } from "./Project";
import '../../css/Projects.css';
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";
import { Navigate, useParams } from "react-router-dom";
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
  if (typeof projectStatus === 'undefined') {
    fetchAagentProjects();
  } else {
    fetchProjects();
  }
}, [username, projectStatus]);

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
            <div key={project.project_id}>
              <Project
                project={project}
                onEdit={() => openEditForm(project)}
                onDelete={() => deleteProject(project.project_id)}
              />
              <div onClick={() => navigate(`/${username}/projects/${projectStatus}/${project.project_id}`)}>
                <Eye />
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
// import { useEffect, useState } from "react";
// import { SearchAndFilter } from "../SearchAndFilter";
// import { Modal } from "../Modal";
// import { AddOrEditProject } from "./AddOrEditProject";
// import { Project } from "./Project";
// import "../../css/Projects.css";
// import { useAuth } from "../../context/AuthContext";
// import { SortSomething, FilterSomething } from "../Actions";
// import { useParams, useNavigate } from "react-router-dom";
// import { CirclePlus, Eye } from "lucide-react";

// export function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [editingProject, setEditingProject] = useState(null);
//   const [sortCriterion, setSortCriterion] = useState("project_id");
//   const [searchCriterion, setSearchCriterion] = useState("project_name");
//   const [searchValue, setSearchValue] = useState("");
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { username, agentName, projectStatus } = useParams();

//   useEffect(() => {
//     if (typeof projectStatus === "undefined") {
//       fetchAgentProjects();
//     } else {
//       fetchProjects();
//     }
//   }, [username, projectStatus]);

//   const fetchAgentProjects = async () => {
//     try {
//       const res = await fetch(`http://localhost:3333/${username}/projects/${agentName}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch projects");
//       const data = await res.json();
//       setProjects(data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(`http://localhost:3333/${username}/projects/${projectStatus}/all`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch projects");
//       const data = await res.json();
//       setProjects(data);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };

//   const deleteProject = async (projectId) => {
//     if (!window.confirm("Are you sure you want to delete this project?")) return;
//     try {
//       const res = await fetch(`http://localhost:3333/${username}/projects/${projectId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) throw new Error("Failed to delete project");
//       setProjects((prev) => prev.filter((p) => p.project_id !== projectId));
//     } catch (error) {
//       alert("Error deleting project: " + error.message);
//     }
//   };

//   const handleUpdated = () => {
//     fetchProjects();
//     setShowForm(false);
//     setEditingProject(null);
//   };

//   const filtered = FilterSomething(searchCriterion, SortSomething(projects, sortCriterion), searchValue);

//   return (
//     <div className="projects-container">
//       <h2 className="projects-title">Projects Manager</h2>

//       <SearchAndFilter
//         sortCriterion={sortCriterion}
//         setSortCriterion={setSortCriterion}
//         searchCriterion={searchCriterion}
//         setSearchCriterion={setSearchCriterion}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//       />

//       <button className="add-project-button" onClick={() => setShowForm(true)}>
//         <CirclePlus size={20} /> Add Project
//       </button>

//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <AddOrEditProject project={editingProject} onSuccess={handleUpdated} />
//         </Modal>
//       )}

//       <div className="projects-scroll-area">
//         {filtered.length > 0 ? (
//           filtered.map((project) => (
//             <div className="projects-list" key={project.project_id}>
//               <div className="project">
//                 <Project
//                   project={project}
//                   onEdit={() => {
//                     setEditingProject(project);
//                     setShowForm(true);
//                   }}
//                   onDelete={() => deleteProject(project.project_id)}
//                 />
//                 <div className="project-actions" onClick={() => navigate(`/${username}/projects/${projectStatus}/${project.project_id}`)}>
//                   <Eye size={16} />
//                   <span>Show details</span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No projects found.</p>
//         )}
//       </div>
//     </div >
//   );
// }
