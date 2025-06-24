import { useParams, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import '../../css/NavigationBar.css'
import { AlignJustify, CircleCheckBig, CircleX, Forward, House, Package, PackageOpen, Reply, ShoppingCart, UserRound } from "lucide-react";

export function NavigationBar() {

    const { username } = useParams();
    const [barStatus, setBarStatus] = useState('open');
    const { user } = useAuth();

    return (
        <nav className="navbar">
            {barStatus === 'open' ? (
                <div className="frame-73">
                    <div className="frame-37">
                        <AlignJustify onClick={() => setBarStatus('close')} />
                        <div className="frame-29">
                            <House />
                            <Link to={`/${username}/home `} className="home"> HOME</Link>
                        </div>
                        <div className="frame-30">
                            <Reply /> 
                            <Link to={`/${username}/contacts/customers`} className="home2">CUSTOMERS</Link>
                        </div>
                        <div className="frame-31">
                            <Forward />
                            <Link to={`/${username}/contacts/suppliers`} className="home2"> SUPPLIERS</Link>
                        </div>
                        {user && user.role === 'admin' && (
                            <div className="frame-32">
                                <UserRound />
                                <Link to={`/${username}/users/agents`} className="home2"> AGENTS</Link>
                            </div>
                        )}
                        <div className="frame-33">
                            <CircleCheckBig />
                            <Link to={`/${username}/todos`} className="home2"> TODOS</Link>
                        </div>
                        <div className="frame-34">
                            <Package />
                            <Link to={`/${username}/projects/close`} className="home2"> CLOSED PROJECTS</Link>
                        </div>
                        <div className="frame-35">
                            <PackageOpen />
                            <Link to={`/${username}/projects/open`} className="home2">OPEN PROJECTS</Link>
                        </div>
                        {user && user.role === 'admin' && (
                            <div className="frame-36">
                                <CircleX />
                                {/* לא יודעת מה לכתוב בניתוב של זה */}
                                <Link className="home2">COMPLETED TRANSACTIONS</Link>
                            </div>
                        )}
                        <div className="frame-372">
                            <ShoppingCart />
                            <Link to={`/${username}/products`} className="home2">PRODUCTS</Link>
                        </div>
                    </div>
                </div>) : (
                <div className="frame-37">
                    <div className="frame-38">
                        <AlignJustify onClick={() => setBarStatus('open')} />
                        <div className="frame-29">
                            <Link to={`/${username}/home`} className="home2">
                                <img className="home-02" src="home-020.svg" />
                            </Link>
                        </div>
                        <div className="frame-30">
                            <Link to={`/${username}/contacts/customers`}>
                                <img className="users-profiles-right" src="users-profiles-right0.svg" />
                            </Link>
                        </div>
                        <div className="frame-31">
                            <Link to={`/${username}/contacts/suppliers`}>
                                <img className="user-profile-left" src="user-profile-left0.svg" />
                            </Link>
                        </div>
                        {user && user.role === 'admin' && (
                            <div className="frame-32">
                                <Link to={`/${username}/users/agents`}>
                                    <img className="users-profiles-01" src="users-profiles-010.svg" />
                                </Link>
                            </div>
                        )}
                        <div className="frame-33">
                            <Link to={`/${username}/todos`}>
                                <img className="check-broken" src="check-broken0.svg" />
                            </Link>
                        </div>
                        <div className="frame-34">
                            <Link to={`/${username}/projects/close`}>
                                <img className="arrow-rotate-right-01" src="arrow-rotate-right-010.svg" />
                            </Link>
                        </div>
                        <div className="frame-35">
                            <Link to={`/${username}/projects/open`}>
                                <img className="arrow-refresh-04" src="arrow-refresh-040.svg" />
                            </Link>
                        </div>
                        {user && user.role === 'admin' && (
                            <div className="frame-36">
                                {/* לא יודעת מה לכתוב בניתוב של זה */}
                                <Link>
                                    <img className="trend-up-01" src="trend-up-010.svg" />
                                </Link>
                            </div>
                        )}
                        <div className="frame-372">
                            <Link to={`/${username}/products`}>
                                <img className="trend-up-012" src="trend-up-011.svg" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <Outlet />
        </nav>
    );
}
export default NavigationBar;