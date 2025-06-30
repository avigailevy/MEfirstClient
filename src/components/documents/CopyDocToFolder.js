
export const CopyDocToFolder = async ({ projectId, docType, stageId, token, userId, username }) => {
    console.log('Copy params CopyDocToFolder:', {
                projectId, docType, stageId, userId, username
            });
    try {
        const res = await fetch(`http://localhost:3333/${username}/documents/copy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ projectId, docType, stageId, userId }),
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Copy successful:', data);
            alert(`הקובץ שוכפל בשם ${data.name}`);
            return data;
        } else {
            console.error('Copy failed:', data);
            alert(`שגיאה בשכפול הקובץ: ${data.error || data.message || JSON.stringify(data)}`);
            return null;
        }
    } catch (err) {
        console.error('שגיאה ב-fetch:', err);
        alert('שגיאה ברשת');
    }

}

