import { useEffect, useState } from "react";
import { SearchAndFilter } from "../SearchAndFilter";
import '../../css/Projects.css'
import { useAuth } from "../../context/AuthContext";
import { SortSomething, FilterSomething } from "../Actions";
import { Outlet, useParams } from "react-router-dom";
import { Link, PencilLine, Trash2 } from 'lucide-react';

export function Projects({ projectStatus }) {
    const [projects, setProjects] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('id');
    const [searchCriterion, setSearchCriterion] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [value, setValue] = useState(35);
    const percent = Math.max(0, Math.min(100, (value / 12) * 100));
    const { isLoggedIn, user } = useAuth();
    const { username, agentName } = useParams();


    useEffect(() => {
        if (isLoggedIn && !agentName) {
            fetchProjects(user.user_id);
            console.log('fetchProjects');
        }
        else {
            fetchProjectsForAdmin();
            console.log(agentName);
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
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:3333/${username}/projects/${projectStatus}/${agentName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    const addProject = async () => {
        if (!newProjectTitle.trim()) return;
        try {
            const res = await fetch(`http://localhost:3333/${username}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: newProjectTitle,
                    user_id: user.user_id
                })
            });
            if (!res.ok) throw new Error("Failed to add project");
            const newProject = await res.json();
            setProjects(prev => [...prev, newProject]);
            setNewProjectTitle('');
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const getCustomerOrSupplierName = (contactId, customerOrSupplier) => {
        try {
            const response = fetch(`http://localhost:3333${username}//contacts/${customerOrSupplier}/contactName/${contactId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch customer name");
            }
            console.log(response);

            return response;
        } catch (error) {
            console.log("Error fetching customer name:", error);
        }
    }

    const getProjectOwnerName = (ownerId) => {
        try {
            const response = fetch(`http://localhost:3333/${username}/users/userName/${ownerId}`, {
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
            const response = fetch(`http://localhost:3333/${username}/products/${productId}`, {
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
                                <PencilLine />
                                <Trash2 />
                                <div className="frame-5">
                                    <div className="frame-75"></div>
                                    {setValue(project.current_stage)}
                                    <div className="frame-76" style={{ width: `${percent}%` }}></div>
                                </div>
                                <Link to={`/${username}/projects/open/display`}>Display Project</Link>
                                <Outlet />
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
