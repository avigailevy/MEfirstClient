import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoogleDocViewer } from '../documents/GoogleDocViewer'
import { Modal } from "../Modal";
import { Products } from "../products/Products";
import { Product } from "../products/Product";
import { UploadFile } from '../documents/UploadFile'
import { AddDocument } from "../documents/AddDocument";

export function StageDisplay() {
    const { username, stageId, projectId } = useParams();
    const [stage, setStage] = useState();
    const [projectProducts, setProjectProducts] = useState();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchStage();
        if (stage > 0) choosePresentation();
    }, [stage])

    const fetchStage = async () => {
        try {
            const res = await fetch(`http://localhost:3333/${username}/stages/${stageId}`, {
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
            const res = await fetch(`http://localhost:3333/${username}/stages/${stageId}`, {
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
        switch (stage.stage_number) {
            case 1:
                return (
                    <UploadFile projectId={projectId} docType={'RFQ'} token={token} />
                );
            case 2:
                return (<GoogleDocViewer StageId={stage.stage_id} />);
            case 3:
                return (
                    <>
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
        </>
    );
}