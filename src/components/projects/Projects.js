import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import '../../css/Projects.css'
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";

export function Projects({ agentId , projectStatus}) {
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('id');
    const [searchCriterion, setSearchCriterion] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [userId, setUserId] = useState(null);
    const [value, setValue] = useState(35);
    const percent = Math.max(0, Math.min(100, (value / 12) * 100));
    const { isLoggedIn, user } = useAuth();


    useEffect(() => {
        if (isLoggedIn) {
            if (user.role === 'admin') {
                fetchProjectsForAdmin(user.userId);
            } else {
                fetchProjects(user.userId);
            }
        }
    }, []);

    const fetchProjects = async (uid) => {
        try {
            const res = await fetch(`http://localhost:3333/projects/${projectStatus}/${uid}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            setAllProjects(data);
            const filtered = data.filter(p => p.user_id === uid);
            setProjects(filtered);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchProjectsForAdmin = async () => {
        try {
            const res = await fetch(`http://localhost:3333/:username/projects/${projectStatus}/${agentId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!res.ok) throw new Error("Failed to fetch project");
            const data = await res.json();
            setAllProjects(data);
            const filtered = data.filter(p => p.user_id === agentId);
            setProjects(filtered);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const addProject = async () => {
        if (!newProjectTitle.trim()) return;
        try {
            const res = await fetch('http://localhost:3333/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: newProjectTitle,
                    user_id: userId
                })
            });
            if (!res.ok) throw new Error("Failed to add project");
            const newProject = await res.json();
            setProjects(prev => [...prev, newProject]);
            setAllProjects(prev => [...prev, newProject]);
            setNewProjectTitle('');
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const getCustomerOrSupplierName = (contactId, customerOrSupplier) => {
        try {
            const response = fetch(`http://localhost:3333/contacts/${customerOrSupplier}/contactName/${contactId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch customer name");
            }
            return response;
        } catch (error) {
            console.log("Error fetching customer name:", error);
        }
    }

    const getProjectOwnerName = (ownerId) => {
        try {
            const response = fetch(`http://localhost:3333/users/userName/${ownerId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch customer name");
            }
            return response;
        } catch (error) {
            console.log("Error fetching user name:", error);
        }
    }

    const getProductName = (productId) => {
        try {
            const response = fetch(`http://localhost:3333/products/${productId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch product name");
            }
            return response.product_name;
        } catch (error) {
            console.log("Error fetching product name:", error);

        }
    }

    const sorted = SortSomething(projects, sortCriterion);
    const filtered = FilterSomething(searchCriterion, sorted, searchValue);

    return (
        <div>
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
                                <img className="edit-02" src="edit-020.svg" />
                                <img className="trash-02" src="trash-020.svg" />
                                <div className="frame-5">
                                    <div className="frame-75"></div>
                                    {setValue(project.current_stage)}
                                    <div className="frame-76" style={{ width: `${percent}%` }}></div>
                                </div>
                                <img className="play-03" src="play-030.svg" />
                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
