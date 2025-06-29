import { data } from "react-router-dom";

export const CopyDocToFolder = async ({ projectName, docType, stageId, token, username, userId }) => {
    try {
        const res = await fetch(`http://localhost:3333/${username}/documents/copy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ projectName, docType, stageId, userId }),
        });

        const data = await res.json();
        
        if (res.ok) {            
            console.log('Copy successful:', data);
            alert(`הקובץ שוכפל בשם ${data.name}`);
            return data;
        } else {
            console.error('Copy failed:', data);
            alert('שגיאה בשכפול הקובץ');
        }
    } catch (err) {
        console.error('שגיאה ב-fetch:', err);
        alert('שגיאה ברשת');
    }
    
}

