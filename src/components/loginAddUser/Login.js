import { useState } from 'react';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!username || !password) {
            setError('יש למלא שם משתמש וסיסמה');
            return;
        }
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
        } catch (err) {
            setError('שם משתמש או סיסמה שגויים');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
            <h2>התחברות</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div>
                <label>שם משתמש:</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                />
            </div>
            <div>
                <label>סיסמה:</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
            </div>
            <button type="submit">התחבר</button>
        </form>
    );
};

export default Login;