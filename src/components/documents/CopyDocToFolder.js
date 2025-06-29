export const CopyDocToFolder = async ({ projectName, docType, token, username }) => {
    try {
        const res = await fetch(`http://localhost:3333/${username}/documents/drive/copy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ projectName, docType }),
        });

        const data = await res.json();
        if (res.ok) {
            console.log('Copy successful:', data);
            alert(`הקובץ שוכפל בשם ${data.name}`);
        } else {
            console.error('Copy failed:', data);
            alert('שגיאה בשכפול הקובץ');
        }
    } catch (err) {
        console.error('שגיאה ב-fetch:', err);
        alert('שגיאה ברשת');
    }
}
