import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleDocViewer } from "../documents/GoogleDocViewer";
import { StageChecklist } from './StageChecklist'

export function StageDisplay() {
    const { stageId } = useParams();
    const [stage, setStage] = useState();

    useEffect(() => {
        fetchStage();
        if (stage > 0) choosePresentation();
    }, [stage])

    const fetchStage = async () => {
        try {
            const res = await fetch(`http://localhost:3333/${username}/stages/${stageId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!res.ok) throw new Error("Failed to fetch stage");
            const data = await res.json();
            setStage(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    const choosePresentation = () => {
        switch (stage.stage_number) {
            case 1:
                <AddGoogleDoc
                    stageId={stageId}
                    projectId={projectId}
                    docType="RFQ"
                    onSuccess={() => console.log("doc added")}
                />
                break;
            case 2:
                return (<StageChecklist StageId={stage.stage_id} />);
            // return (<GoogleDocViewer StageId={stage.stage_id} />);
            case 3:

            default:
                break;
        }
    }

    return (
        <>
        </>
    );
}