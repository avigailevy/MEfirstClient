import { useParams } from 'react-router-dom';
import { NavigationBar } from '../homePage/NavigationBar'
import { Stages } from '../stages/Stages'
import { useEffect, useState } from 'react';
import { Header } from '../homePage/Header'
import { TextBox } from '../summaries/TextBox'

export function ProjectDisplay({ }) {
    const { username, projectId } = useParams();
    const [project, setProject] = useState();

    useEffect(() => {
        fetchProject();
    }, [project]);

    const fetchProject = async () => {
        try {
            const response = await fetch(`http://localhost:3333/${username}/projects/${projectId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Barear ${localStorage.getItem("token")}`,

                }
            })
            if (!response.ok) {

            }
            const data = await response.json();
            setProject(data);
        } catch (error) {

        }
    }

    return (
        <>
            <NavigationBar />
            <Header title={project} />
            <Stages projectId={project.id} />
            <input type='button'>Summaries</input>
            <input type='button'>Documents</input>
            <TextBox />
        </>
    );
}