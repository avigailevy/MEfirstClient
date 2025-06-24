import { Link } from 'react-router-dom';
import { Notification } from './Notification'
export function Header() {

    const deleteToken = () => {
        localStorage.clear();
    }

    return (
        <div className="header-container">
            <Notification userRole={'admin'} />
            <div>
                <Link to={`http://localhost:3000`} onClick={deleteToken}>Log out</Link>
            </div>
        </div>
    );
}                    