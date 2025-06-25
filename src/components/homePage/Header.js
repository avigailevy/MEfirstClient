import { Link, Outlet } from 'react-router-dom';
import { Notification } from './Notification'
import { LogOut } from 'lucide-react';
import '../../css/Header.css'

export function Header({title}) {

    const deleteToken = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    }

    return (
        <div className="header-container">     
        <div>{title}</div>       
            <div className="logout-button">
                <Link to={`/login`} onClick={deleteToken}><LogOut /></Link>
                <Outlet />
            </div>
            <Notification userRole={'admin'} />
        </div>
    );
}                    