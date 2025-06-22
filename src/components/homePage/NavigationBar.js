import { useParams, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";

export function NavigationBar() {

    const { username } = useParams();
    const [barStatus, setBarStatus] = useState('open');
    const { user } = useAuth();

    return (
        <nav className="navbar">
            {barStatus === 'open' ? (
                <div class="frame-73">
                    <div class="frame-37">
                        <img class="component-9" src="component-9.svg" onClick={() =>setBarStatus('close')} />
                        <div class="frame-29">
                            <img class="home-02" src="home-020.svg" />
                            <Link to={`/${username}/home `} className="home">HOME</Link>
                        </div>
                        <div class="frame-30">
                            <img class="users-profiles-right" src="users-profiles-right0.svg" />
                            <Link to={`/${username}/customers/all`} className="home2">CUSTOMERS</Link>
                        </div>
                        <div class="frame-31">
                            <img class="user-profile-left" src="user-profile-left0.svg" />
                            <Link to={`/${username}/suppliers/all`} className="home2">SUPPLIERS</Link>
                        </div>
                        {user.role === 'admin' && (
                            <div class="frame-32">
                                <img class="users-profiles-01" src="users-profiles-010.svg" />
                                <Link to={`/${username}/agents/all`} className="home2">AGENTS</Link>
                            </div>
                        )}
                        <div class="frame-33">
                            <img class="check-broken" src="check-broken0.svg" />
                            <Link to={`/${username}/todos/all`} className="home2">TODOS</Link>
                        </div>
                        <div class="frame-34">
                            <img class="arrow-rotate-right-01" src="arrow-rotate-right-010.svg" />
                            <Link to={`/${username}/closed`} className="home2">CLOSED PROJECTS</Link>
                        </div>
                        <div class="frame-35">
                            <img class="arrow-refresh-04" src="arrow-refresh-040.svg" />
                            <Link to={`/${username}/opened`} className="home2">OPEN PROJECTS</Link>
                        </div>
                        {user.role === 'admin' && (
                            <div class="frame-36">
                                <img class="trend-up-01" src="trend-up-010.svg" />
                                {/* לא יודעת מה לכתוב בניתוב של זה */}
                                <Link className="home2">COMPLETED TRANSACTIONS</Link>
                            </div>
                        )}
                        <div class="frame-372">
                            <img class="trend-up-012" src="trend-up-011.svg" />
                            <Link to={`/${username}/products`} className="home2">PRODUCTS</Link>
                        </div>
                    </div>
                </div>) : (
                <div class="frame-37">
                    <div class="frame-38">
                        <img class="component-9" src="component-9.svg" onClick={() =>setBarStatus('open')} />
                        <div class="frame-29">
                            <Link to={`/${username}/home/all`} class="home2">
                                <img class="home-02" src="home-020.svg" />
                            </Link>
                        </div>
                        <div class="frame-30">
                            <Link to={`/${username}/customers/all`}>
                                <img class="users-profiles-right" src="users-profiles-right0.svg" />
                            </Link>
                        </div>
                        <div class="frame-31">
                            <Link to={`/${username}/suppliers/all`}>
                                <img class="user-profile-left" src="user-profile-left0.svg" />
                            </Link>
                        </div>
                        {user.role === 'admin' && (
                            <div class="frame-32">
                                <Link to={`/${username}/agents/all`}>
                                    <img class="users-profiles-01" src="users-profiles-010.svg" />
                                </Link>
                            </div>
                        )}
                        <div class="frame-33">
                            <Link to={`/${username}/todos/all`}>
                                <img class="check-broken" src="check-broken0.svg" />
                            </Link>
                        </div>
                        <div class="frame-34">
                            <Link to={`/${username}/closed`}>
                                <img class="arrow-rotate-right-01" src="arrow-rotate-right-010.svg" />
                            </Link>
                        </div>
                        <div class="frame-35">
                            <Link to={`/${username}/opened`}>
                                <img class="arrow-refresh-04" src="arrow-refresh-040.svg" />
                            </Link>
                        </div>
                        {user.role === 'admin' && (
                            <div class="frame-36">
                                {/* לא יודעת מה לכתוב בניתוב של זה */}
                                <Link>
                                    <img class="trend-up-01" src="trend-up-010.svg" />
                                </Link>
                            </div>
                        )}
                        <div class="frame-372">
                            <Link to={`/${username}/products`}>
                                <img class="trend-up-012" src="trend-up-011.svg" />
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