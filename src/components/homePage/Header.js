import { Link, Outlet } from 'react-router-dom';
import { Notification } from './Notification'
import { LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css'
import { useEffect, useState } from 'react';

export const Header = () => {

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
            <div className="frame-72">
                <div className="frame-66">
                    <div className="logo">LOGO</div>
                </div>
                <div className="frame-71">
                    <div className="frame-70">
                        <img className="notification" src="notification0.svg" />
                        <div className="frame-69">
                            <div className="group-4">
                                <img className="ellipse-1" src="ellipse-10.png" />
                            </div>
                            <div className="frame-68">
                                <div className="frame-67">
                                    <div className="seving-aslanova">Seving Aslanova</div>
                                    <div className="seving-aslanova2">Seving Aslanova</div>
                                </div>
                                <img className="vector" src="vector0.svg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>{title}</div>
            <div className="logout-button">
                <Link to={`/login`} onClick={deleteToken}><LogOut /></Link>
                <Outlet />
            </div>
            <Notification userRole={'admin'} />
        </div>
    );
}                    