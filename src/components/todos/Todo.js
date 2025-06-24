import { useState } from 'react';
import '../../css/Todos.css';

export function Todo({ todo, onUpdate, onDelete }) {
    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const handleToggleComplete = async () => {
        try {
            const res = await fetch(`http://localhost:3333/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    completed: !isCompleted
                })
            });
            if (!res.ok) throw new Error("Failed to update");
            setIsCompleted(!isCompleted);
            onUpdate?.(); // ריענון רשימה אם צריך
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3333/todos/${todo.todo_id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
            if (!res.ok) throw new Error("Failed to delete");
            onDelete?.(todo.todo_id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="frame-83">
            <div className="rectangle-21"></div>
            <div className="frame-81">
                <div className="frame-78">
                    <div className="title">{todo.title}</div>
                    <div className="frame-84">
                        <div className="dots">...</div>
                    </div>
                </div>

                <div className="frame-80">
                    <div className="description">{todo.description}</div>
                    <div className="meta">
                        <label>
                            <input type="checkbox" checked={isCompleted} onChange={handleToggleComplete} />
                            <span className="status-label">הושלם</span>
                        </label>
                        <span className="sent-time"> {new Date(todo.sent_time).toLocaleString()}</span>
                    </div>
                    <div className="actions">
                        <button onClick={() => alert('עריכה בעתיד...')}>edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
