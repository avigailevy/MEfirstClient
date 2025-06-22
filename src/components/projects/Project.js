import { useState } from "react";
import { useEffect } from "react";

export function Project({ currentStage }) {

    const [documentFilePath, setDocumentFilePath] = useState('');

    const getDocumentFilePath = async () => {
        try {
            const response = await fetch(`http://localhost:3333/open/${currentStage}/getFile_path`, {
                method: 'GET',

            });
            const data = await response.json();
            setDocumentFilePath(data.filePath);
        } catch (error) {
            console.error('Error fetching document File_path:', error);
        }
    }

    // Fetch the document file path when the component mounts
    useEffect(() => {
        getDocumentFilePath();
    }, [currentStage]);

    const showNextStage = async () => { }

    const uploadFile = async () => {
        try {
            const response = await fetch(`http://localhost:3333/open/${currentStage}/uploadFile`, {
                method: 'POST',
                body: JSON.stringify({ filePath: documentFilePath }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('File uploaded successfully:', data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }

    return (
        <div className="project">
            <iframe
                src={`${documentFilePath}/edit`}
                width="100%"
                height="800"
                frameborder="0"
                allowfullscreen
            ></iframe>
            <button className="btn-projects" id="btn-next-stage" onClick={() => showNextStage()}>Stage completed</button>
            <button className="btn-projects" id="btn-upload-file" onClick={() => uploadFile()}>Upload file</button>
        </div>
    );
}