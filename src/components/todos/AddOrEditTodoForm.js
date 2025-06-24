import { useEffect, useState } from 'react';

export function AddOrEditTodoForm({ onSuccess, todo = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
      setDescription(todo.description || '');
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = todo
      ? `http://localhost:3333/todos/${todo.todo_id}`
      : 'http://localhost:3333/todos';
    const method = todo ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) throw new Error('Request failed');
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h3>{todo ? 'עריכת משימה' : 'הוספת משימה'}</h3>
      <input
        type="text"
        placeholder="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="תיאור"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{todo ? 'עדכון' : 'הוספה'}</button>
    </form>
  );
}
