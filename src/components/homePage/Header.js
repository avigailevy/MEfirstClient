import { Link, Outlet } from 'react-router-dom';
import { Notification } from './Notification'
import { CircleUserRound, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const Header = () => {

    const token = localStorage.getItem('token');
    let userRole = '';

    if (token) {
        try {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            userRole = decoded.role;
        } catch (error) {
            console.error("Invalid token", error);
        }
    }
    console.log(userRole);


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
                location.pathname.includes('close') ? 'Closed Projects' :
                    location.pathname.includes('open') ? 'Opened Projects' :
                        location.pathname.includes('products') ? 'Products' :
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


            <div className="profilee">
                <CircleUserRound className='profile' size={48} />
                <div className="userRole">{userRole}</div>
            </div>
            <div className='title'>{title}</div>
            <div className='endheader'>
                <Notification userRole={'admin'} />
                <div className="logout-button">
                    <Link to={`/login`} onClick={deleteToken}><LogOut /></Link>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}                    