import { useEffect, useState } from 'react';

export function GoogleDocViewer({ StageId , documentType}) {

    const [docUrl, setDocUrl] = useState(null);

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

    return (
        <div>
            {docUrl ? (
                <iframe
                    src={docUrl}
                    width="100%"
                    height="600px"
                    allow="clipboard-write"
                    title="Google Doc"
                />
            ) : (
                <p>Loading document...</p>
            )}
        </div>
    );
}
