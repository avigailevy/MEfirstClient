import { Navigate, useParams } from 'react-router-dom'
import { NavigationBar } from '../homePage/NavigationBar'
import { useState, useEffect } from 'react';
import { Stage } from './Stage'
export function Stages({ projectId }) {

    const { username } = useParams();
    const [projectStages, setProjectStages] = useState();

    useEffect(() => {
        fetchProjectStages();
    }, []);

    const fetchProjectStages = async () => {
        try {
            const res = await fetch(`http://localhost:3333/${username}/stages/${projectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) throw new Error("Failed to fetch project stages");
            const data = await res.json();
            setProjectStages(data);
        } catch (error) {

        }
    }

    return (
        <>
            <NavigationBar />
            {projectStages.map((stage) => (
                <div onClick={() => Navigate(``)} key={stage.stage_id}>
                    <Stage
                        stageNum={stage.stage_number}
                        stageStat={stage.completed}
                        stageName={stage.stage_name}
                    />
                </div>
            ))}
        </>
    );
}