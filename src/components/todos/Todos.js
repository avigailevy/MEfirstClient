import { useEffect, useState } from "react";
import { Todo } from "./Todo";
import { useParams } from "react-router-dom";
import '../../css/Todos.css';


export function Todos() {
  const { username } = useParams();
  const [todos, setTodos] = useState([]);
  // const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');


  useEffect(() => {
    
    fetchTodos();
    //  fetchUsers();
   
  }, []);
  

 const fetchUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

     const response = await fetch(`http://localhost:3333/${username}/users`,{
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Failed to fetch todo");

    const data = await response.json();
    setUsers(data);
    console.log("Fetched todo:", data);

  } catch (error) {
    console.error("Error fetching todo:", error);
  }
  };

  const fetchTodos = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found");

    const response = await fetch("http://localhost:3333/:userName/todos", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error("Failed to fetch todo");

    const data = await response.json();
    setTodos(data);
    console.log("Fetched todo:", data);

  } catch (error) {
    console.error("Error fetching todo:", error);
  }
  };

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
      const response = await fetch('http://localhost:3333/todos', {
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
           <Todo todo={todo} setTodo={setTodos} />
          </div>
        ))
      ) : (
        <p>no todos</p>
      )}
    </div>
  );
}
