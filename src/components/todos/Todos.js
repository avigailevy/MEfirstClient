import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Todo } from "./Todo";
import '../../css/todos.css';

export function Todos() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  // טען משתמשים
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // טען טודואים שהמשתמש מקבל
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3001/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) fetchTodos();
  }, [userId]);

  const addTodo = async () => {
    if (!selectedUserId) {
      alert('Please select a user to assign the task');
      return;
    }
    if (!newTodoTitle.trim()) {
      alert('Title is required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          to_user_id: selectedUserId,
          title: newTodoTitle,
          description: newDescription,
        }),
      });

      if (!response.ok) throw new Error('Failed to add todo');

      const newTodo = await response.json();
      setTodos(prev => [...prev, newTodo]);
      setNewTodoTitle('');
      setNewDescription('');
      setSelectedUserId('');
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      <h3 className="todosTitle">Todos Manager</h3>

      <form onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
        >
          <option value="" disabled>send to</option>
          {users.map(user => (
            <option key={user.user_id} value={user.user_id}>
              {user.username}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="New Todo Title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <button type="submit">+</button>
      </form>

      {todos.length > 0 ? (
        todos.map(todo => (
          <div key={todo.todo_id} className="todo-container">
            <Todo td={todo} alltd={todos} setTodo={setTodos} />
          </div>
        ))
      ) : (
        <p>no todos</p>
      )}
    </div>
  );
}
