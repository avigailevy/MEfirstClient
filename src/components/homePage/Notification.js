import { BellRing } from 'lucide-react';
import { useState } from 'react';
import '../../css/Notification.css'

export function Notification({ userRole }) {
    const [notes, setNotes] = useState([
        { id: 1, text: "ברוך הבא למערכת!" }
    ]);
    const [open, setOpen] = useState(false);

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleAddNote = () => {
        const newNote = prompt("הכנס טקסט ההתראה:");
        if (newNote) {
            const id = Date.now();
            setNotes([...notes, { id, text: newNote }]);
        }
    };

    return (
  <div className="notification-container">
    {/* אייקון פעמון + כפתור הוספה (רק למנהלים) */}
    <div className="notification-icon" onClick={() => setOpen(!open)}>
      <BellRing />
      {userRole === 'admin' && (
        <div
          className="notification-add"
          onClick={(e) => {
            e.stopPropagation(); // שלא יפתח את הפופאפ
            handleAddNote();
          }}
        >
          הוסף התראה
        </div>
      )}
    </div>

    {/* תפריט ההתראות (אם פתוח) */}
    {open && (
      <div className="notification-popup">
        {notes.length === 0 ? (
          <div className="notification-empty">אין התראות</div>
        ) : (
          notes.map(note => (
            <div
              key={note.id}
              className="notification-note"
              onClick={() => handleDelete(note.id)}
              title="לחץ כדי למחוק"
            >
              {note.text}
            </div>
          ))
        )}
      </div>
    )}
  </div>
);

}


