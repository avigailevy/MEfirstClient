import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
        setError('Username and password are required');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'GET',
            body: JSON.stringify({ username, password })

        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        if (!data.token) {
            throw new Error('No token received from server');
        }
        localStorage.setItem('token', data.token);

        // כאן אפשר להוסיף ניווט לדף הבית אם את משתמשת ב-React Router
        // navigate('/home');

    } catch (err) {
        setError(err.message || 'Invalid username or password');
    }
};

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;