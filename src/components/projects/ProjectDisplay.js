import { useParams } from 'react-router-dom';
import { NavigationBar } from '../homePage/NavigationBar'
import { Stages } from '../stages/Stages'
import { useState } from 'react';

export function ProjectDisplay({ }) {
    const { username, projectId } = useParams();
    const [project, setProject] = useState();

    const fetchProjec = async () => {
        try {
            const response = await fetch(`http://localhost:3333/${username}/projects/${projectId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Barear ${localStorage.getItem("token")}`,

                }
            })
            if(!response.ok){

            }
        } catch (error) {

        }
    }

    return (
        <>
            <NavigationBar />
            <Stages projectId={project.id}/>
        </>
    );
}