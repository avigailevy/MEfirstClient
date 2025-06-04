import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // כאן תוכל להוסיף קריאה ל-API או לוגיקה לאימות
        if (!username || !password) {
            setError('יש למלא שם משתמש וסיסמה');
            return;
        }
        try {
            // דוגמה: קריאה לפונקציית התחברות
            await onLogin({ username, password });
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