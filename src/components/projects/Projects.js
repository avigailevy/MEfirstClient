import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { SortSomething, FilterSomething } from "../Actions";
import { SearchAndFilter } from "../SearchAndFilter";
import '../../css/projects.css';

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [sortCriterion, setSortCriterion] = useState('id');
    const [searchCriterion, setSearchCriterion] = useState('title');
    const [searchValue, setSearchValue] = useState('');
    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserId(decoded.userId);
            fetchProjects(decoded.userId);
        }
    }, []);

    const fetchProjects = async (uid) => {
        try {
            const res = await fetch("http://localhost:3001/projects", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            const data = await res.json();
            setAllProjects(data);
            const filtered = data.filter(p => p.user_id === uid);
            setProjects(filtered);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const addProject = async () => {
        if (!newProjectTitle.trim()) return;
        try {
            const res = await fetch('http://localhost:3001/projects', {
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
                            <h4>{project.title}</h4>
                            {/* אפשר להוסיף עוד מידע כאן בעתיד */}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
