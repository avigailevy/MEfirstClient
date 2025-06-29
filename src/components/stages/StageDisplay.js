import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleDocViewer } from '../documents/GoogleDocViewer'
import { Modal } from "../Modal";
import { Products } from "../products/Products";
import { Product } from "../products/Product";
import { UploadFile } from '../documents/UploadFile'
import { AddDocument } from "../documents/AddDocument";
import { useAuth } from '../../context/AuthContext'

export function StageDisplay({ username, projectId, stageId }) {
    const [stage, setStage] = useState();
    const [projectProducts, setProjectProducts] = useState();
    const token = localStorage.getItem('token');
    const { user } = useAuth();

    useEffect(() => {
        if (username && stageId) {
            fetchStage();
        }
    }, [username, stageId]);


    const fetchStage = async () => {
        try {
            console.log('in fetchStage');
            const res = await fetch(`http://localhost:3333/${username}/stages/display/${stageId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
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

    const fetchProjectProducts = async () => {
        try {
            //גם פה פונים לטבלת קשר בין פרוייקטים ומוצרים
            const res = await fetch(`http://localhost:3333/${username}/${stageId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!res.ok) throw new Error("Failed to fetch stage");
            const data = await res.json();
            setProjectProducts(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    const choosePresentation = () => {
        console.log('in choosePresentation');
        console.log('stage number:'+ stage.stage_number);
        switch (stage.stage_number) {
            case 1:             

                return (
                    <>
                        <GoogleDocViewer
                            projectId={projectId}
                            docType={'RFQ'}
                            stageId={stageId}
                            token={token}
                            username={username}
                            user_id={ user.user_id}
                        />
                    </>
                );
            case 2:
                return (<GoogleDocViewer StageId={stage.stage_id} />);
            case 3:
                return (
                    <>
                        fghfhh
                        <Modal onClose={fetchProjectProducts}>
                            <Products />
                        </Modal>
                        {projectProducts > 0 ? (
                            projectProducts.map((product) => {
                                <div key={product.product_id}>
                                    <Product />
                                    <input type="button" value={'Send file to supplier'} />
                                </div>
                            })
                        ) : (
                            <>no products found.</>
                        )}
                    </>
                );
            case 4:
                return (
                    <>
                        <AddDocument
                            stageId={stageId}
                            projectId={projectId}
                            docType="RFQ"
                            onSuccess={() => console.log("doc added")}
                        />
                    </>
                );
            case 5:
            case 6:
            default:
                break;
        }
    }

    return (
        <>
            {stage ? choosePresentation() : <div>טוען נתוני שלב...</div>}
        </>
    );

}