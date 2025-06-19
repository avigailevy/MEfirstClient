import { useState } from 'react';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('password and username are required');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/login/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Login failed');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
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