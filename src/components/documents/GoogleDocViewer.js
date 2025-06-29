// import { useEffect, useState } from 'react';
// import { CopyDocToFolder } from '../documents/CopyDocToFolder';

// export function GoogleDocViewer({ projectId, docType, stageId, token, username, user_id }) {

//     console.log(`projectId: ${projectId}, docType: ${docType}, stageId: ${stageId}, token: ${token}, username: ${username}, user_id: ${user_id}`);

//     const [docUrl, setDocUrl] = useState(null);
//     const [newDocUrl, setNewDocUrl] = useState(null);

//     useEffect(() => {
//         fetchDocUrl();
//     }, [projectId, docType, username]);

//     const fetchDocUrl = async () => {
//         try {
//             const res = await fetch(`http://localhost:3333/${username}/documents/getFilePath/${projectId}/${docType}`, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!res.ok) throw new Error('Doc not found');
//             const data = await res.json();
//             setDocUrl(data.file_path);
//         } catch (err) {
//             console.error('Error loading doc:', err);
//         }
//     };

//     const handleEdit = async () => {
//         try {
//             const newDoc = await CopyDocToFolder(projectId, docType, stageId, token, username, user_id);
//             setNewDocUrl(`https://docs.google.com/document/d/${newDoc.fileId}/edit`);
//         } catch (err) {
//             console.error('Error copying doc:', err);
//         }
//     };

//     return (
//         <div>
//             {docUrl ? (
//                 <iframe
//                     src={docUrl.replace(/\/edit.*$/, '/view')}
//                     width="100%"
//                     height="650px"
//                     allow="autoplay"
//                     title="Google Doc View Only"
//                 />
//             ) : (
//                 <p>Loading document...</p>
//             )}
//             <input type='button' value={`Edit document`} onClick={handleEdit} />

//             {newDocUrl && <iframe
//                 src={newDocUrl}
//                 width="100%"
//                 height="600px"
//                 allow="clipboard-write"
//                 title="Google Doc"
//             />}
//         </div>
//     );
// }


// import { useEffect, useState } from 'react';
// import { CopyDocToFolder } from '../documents/CopyDocToFolder';

// export function GoogleDocViewer({ projectId, docType, stageId, token, username, user_id }) {
//     const [docUrl, setDocUrl] = useState(null);      // כתובת המסמך לצפייה בלבד
//     const [newDocUrl, setNewDocUrl] = useState(null); // כתובת המסמך החדש לעריכה
//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         fetchDocUrl();
//     }, [projectId, docType, username]);

//     const fetchDocUrl = async () => {
//         try {
//             const res = await fetch(`http://localhost:3333/${username}/documents/getFilePath/${projectId}/${docType}`, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!res.ok) throw new Error('Doc not found');
//             const data = await res.json();

//             // לוודא שהקישור מסתיים ב-/view
//             const cleanedUrl = data.file_path.replace(/\/(edit|view).*$/, '/view');
//             setDocUrl(cleanedUrl);
//         } catch (err) {
//             console.error('Error loading doc:', err);
//         }
//     };

//     const handleEdit = async () => {
//         try {
//             const newDoc = await CopyDocToFolder(projectId, docType, stageId, token, username, user_id);
//             const newUrl = `https://docs.google.com/document/d/${newDoc.fileId}/edit`;
//             setNewDocUrl(newUrl);
//             setIsEditing(true);
//         } catch (err) {
//             console.error('Error copying doc:', err);
//         }
//     };

//     return (
//         <div style={{ margin: '2rem auto', maxWidth: '900px' }}>
//             {/* מצב תצוגה בלבד */}
//             {!isEditing && docUrl && (
//                 <div
//                     style={{
//                         border: '1px solid #ccc',
//                         borderRadius: '12px',
//                         padding: '1rem',
//                         boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
//                         backgroundColor: '#f9f9f9',
//                     }}
//                 >
//                     <p style={{ marginBottom: '1rem' }}>
//                         זהו מסמך תבנית לקריאה בלבד. אם ברצונך לערוך אותו, לחץ על הכפתור כדי ליצור עותק אישי לעריכה:
//                     </p>
//                     <iframe
//                         src={docUrl}
//                         width="100%"
//                         height="400px"
//                         allow="autoplay"
//                         title="Google Doc Template"
//                         style={{ border: 'none', borderRadius: '8px' }}
//                     />
//                     <div style={{ textAlign: 'center', marginTop: '1rem' }}>
//                         <button
//                             onClick={handleEdit}
//                             style={{
//                                 padding: '0.5rem 1.5rem',
//                                 backgroundColor: '#4285f4',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 cursor: 'pointer',
//                                 fontSize: '1rem',
//                             }}
//                         >
//                             ערוך גרסה חדשה
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* מצב עריכה */}
//             {isEditing && newDocUrl && (
//                 <div
//                     style={{
//                         marginTop: '2rem',
//                         border: '1px solid #4285f4',
//                         borderRadius: '12px',
//                         padding: '1rem',
//                         backgroundColor: '#eef4ff',
//                     }}
//                 >
//                     <p style={{ marginBottom: '1rem', color: '#2c4e91' }}>
//                         זוהי הגרסה האישית שלך לעריכה:
//                     </p>
//                     <iframe
//                         src={newDocUrl}
//                         width="100%"
//                         height="650px"
//                         allow="clipboard-write"
//                         title="Editable Google Doc"
//                         style={{ border: 'none', borderRadius: '8px' }}
//                     />
//                 </div>
//             )}

//             {/* טעינה */}
//             {!docUrl && !isEditing && (
//                 <p style={{ textAlign: 'center', marginTop: '2rem' }}>טוען את המסמך...</p>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import { CopyDocToFolder } from '../documents/CopyDocToFolder';
import { useParams } from 'react-router-dom';

export function GoogleDocViewer({ projectId, docType, stageId, token, user_id }) {
    const [docUrl, setDocUrl] = useState(null);      // קישור תצוגה בלבד
    const [newDocUrl, setNewDocUrl] = useState(null); // קישור לעריכה
    const [isEditing, setIsEditing] = useState(false);
    const { username } = useParams();

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
            const cleanedUrl = data.file_path.replace(/\/(edit|view).*$/, '/view');
            setDocUrl(cleanedUrl);
        } catch (err) {
            console.error('Error loading doc:', err);
        }
    };

    const handleEdit = async () => {
        try {
            console.log('username:', username);
            console.log('Copy params:', {
                projectId, docType, stageId, userId: user_id, username
            });

            const newDoc = await CopyDocToFolder({ projectId, docType, stageId, token, user_id, username });
            if (!newDoc || !newDoc.fileId) {
                throw new Error('Failed to copy document');
            }
            const newUrl = `https://docs.google.com/document/d/${newDoc.fileId}/edit`;
            setNewDocUrl(newUrl);
            setIsEditing(true);
        } catch (err) {
            console.error('Error copying doc:', err);
        }
    };

    if (isEditing && newDocUrl) {
        // מצב עריכה - מציג iframe של המסמך החדש
        return (
            <div style={{ marginTop: '2rem' }}>
                <p style={{ marginBottom: '1rem', color: '#2c4e91' }}>זוהי הגרסה שלך לעריכה:</p>
                <iframe
                    src={newDocUrl}
                    width="100%"
                    height="650px"
                    allow="clipboard-write"
                    title="Editable Google Doc"
                    style={{ border: 'none', borderRadius: '8px' }}
                />
            </div>
        );
    }

    // מצב תצוגה - ריבוע קטן עם אייקון מסמך וכפתור להתחלת עריכה
    return (
        <div
            style={{
                width: 200,
                border: '1px solid #ccc',
                borderRadius: 12,
                padding: 20,
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                userSelect: 'none',
                margin: 'auto',
            }}
            onClick={handleEdit}
            title="לחץ כדי ליצור גרסה לעריכה"
        >
            {/* סמל מסמך */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#4285f4"
                viewBox="0 0 24 24"
                width="64px"
                height="64px"
                style={{ marginBottom: 12 }}
            >
                <path d="M6 2h7l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM13 3.5V9h5.5L13 3.5z" />
            </svg>

            <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{docType}</div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                }}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 14,
                }}
            >
                Edit Document
            </button>
        </div>
    );
}
