import { useEffect, useState } from 'react';
import { CopyDocToFolder } from '../documents/CopyDocToFolder';

export function GoogleDocViewer({ projectId, docType, stageId, token, username, user_id }) {

    console.log(`projectId: ${projectId}, docType: ${docType}, stageId: ${stageId}, token: ${token}, username: ${username}, user_id: ${user_id}`);

    const [docUrl, setDocUrl] = useState(null);
    const [newDocUrl, setNewDocUrl] = useState(null);

    useEffect(() => {
        fetchDocUrl();
    }, [projectId, docType, username]);

    const fetchDocUrl = async () => {
        try {
            const res = await fetch(`http://localhost:3333/${username}/documents/getFilePath/${projectId}/${docType}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Doc not found');
            const data = await res.json();
            setDocUrl(data.file_path);
        } catch (err) {
            console.error('Error loading doc:', err);
        }
    };

    const handleEdit = async () => {
        try {
            const newDoc = await CopyDocToFolder(projectId, docType, stageId, token, username, user_id);
            setNewDocUrl(`https://docs.google.com/document/d/${newDoc.fileId}/edit`);
        } catch (err) {
            console.error('Error copying doc:', err);
        }
    };

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

            {newDocUrl && <iframe
                src={newDocUrl}
                width="100%"
                height="600px"
                allow="clipboard-write"
                title="Google Doc"
            />}
        </div>
    );
}
