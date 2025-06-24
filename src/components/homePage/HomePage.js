import { Header } from './Header';
import { NavigationBar } from './NavigationBar';
import { Project } from '../projects/Project';
import { useAuth } from '../../context/AuthContext'
import { useEffect, useState } from 'react';

export function HomePage() {

    const { user } = useAuth();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (user?.username) {
            fetchRecentProjects(user.username);
        }
    }, [user]);

    const fetchRecentProjects = async (uname) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3333/${uname}/projects/recent`, {

                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch recent projects');
            const data = await response.json();
            if (data.length > 0) {
                setProjects(data);
            } else {
                setProjects([]);
                console.log("No recent projects found.");
            }
        }
        catch (error) {
            setProjects([]);
            console.error("Error fetching recent projects:", error);
        }
    }

    return (
        <>
            <Header />
            <NavigationBar />
            {projects.length > 0 ? (
                projects.map((project) => (
                    <Project key={project.id} project={project} />
                ))
            ) : (
                <div>No recent projects found.</div>
            )}
        </>

    );
}