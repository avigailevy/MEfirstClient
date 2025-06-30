import { Link, Outlet, useParams } from 'react-router-dom';
import { Notification } from './Notification'
import { CircleUserRound, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {

    const token = localStorage.getItem('token');
    let username = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            username = decoded.username || decoded.name || decoded.sub; // לפי איך שהשרת שלך יצר את הטוקן
        } catch (error) {
            console.error("Invalid token", error);
        }
    }
    const location = useLocation();
    const [title, setTitle] = useState('Home Page');

    useEffect(() => {
        setTitleOfHeder();
        console.log('Current path:', location.pathname);
        console.log('Title:', title);
    }, [location.pathname])

    const setTitleOfHeder = () => {
        setTitle(
            location.pathname.includes('home') ? 'Home Page' :
                location.pathname.includes('projects') ? 'Projects' :
                    location.pathname.includes('products') ? 'Products' :
                        location.pathname.includes('contacts') ? 'Contacts' :
                            location.pathname.includes('todos') ? 'Todos' :
                                location.pathname.includes('suppliers') ? 'Suppliers' :
                                    location.pathname.includes('customers') ? 'Customers' :
                                        location.pathname.includes('agents') ? 'Agents' : '')
    }

    const deleteToken = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    }

    return (
        <div className="header-container">

            <div className="logo">LOGO</div>
            <CircleUserRound size={48} />
            <div className="frame-67">
                <div className="username">{username}</div>
            </div>
            <div className='title'>{title}</div>
            <div className="logout-button">
                <Link to={`/login`} onClick={deleteToken}><LogOut /></Link>
                <Outlet />
            </div>
            <Notification userRole={'admin'} />
        </div>
    );
}                    