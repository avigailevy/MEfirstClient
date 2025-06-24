import { BellRing } from 'lucide-react';
import { useState } from 'react';

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
        <div className="relative inline-block text-right">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
                <BellRing className="w-6 h-6 text-gray-700 hover:text-black" />
                {userRole === 'admin' && (
                    <div 
                        className="w-4 h-4 text-green-600 hover:text-green-800" 
                        onClick={(e) => {
                            e.stopPropagation(); // כדי שהפופאפ לא ייפתח
                            handleAddNote();
                        }}
                    >add note</div>
                )}
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
                    {notes.length === 0 ? (
                        <div className="p-4 text-gray-500 text-center">אין התראות</div>
                    ) : (
                        notes.map(note => (
                            <div
                                key={note.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                                onClick={() => handleDelete(note.id)}
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
