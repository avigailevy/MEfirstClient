import { useEffect, useState } from 'react';
import { CopyDocToFolder } from '../documents/CopyDocToFolder';

export function GoogleDocViewer({ projectId, docType, stageId, token, username, user_id }) {

    const [docUrl, setDocUrl] = useState(null);
    const [newDocUrl, setNewDocUrl] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        fetchDocUrl();
    }, []);

    const fetchDocUrl = async () => {
        try {
            const res = await fetch(`http://localhost:3333/documents/${StageId}`);
            if (!res.ok) throw new Error('Doc not found');
            const data = await res.json();
            setDocUrl(data);
        } catch (err) {
            console.error('Error loading doc:', err);
        }
    };

    const handleEdit = () => {
        const newDoc = CopyDocToFolder(projectId, docType, stageId, token, username, user_id);
        setNewDocUrl(`https://docs.google.com/document/d/${newDoc.fileId}/edit`);
    }

    return (
        <div>
            {docUrl ? (
                <iframe
                    src={docUrl}
                    width="100%"
                    height="600px"
                    allow="autoplay"
                    title="Google Doc"
                />
            ) : (
                <p>Loading document...</p>
            )}
            <input type='button' value={`Edit document`} onClick={handleEdit} />

            {edit && <iframe
                src={newDocUrl}
                width="100%"
                height="600px"
                allow="clipboard-write"
                title="Google Doc"
            />}
        </div>
    );
}
