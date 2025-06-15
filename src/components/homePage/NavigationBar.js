import { useParams, Link, Outlet } from 'react-router-dom';

export function NavigationBar() {

    const { username } = useParams();

    return (
        <nav className="navbar">
            <div class="frame-73">
                <div class="frame-37">
                    <div class="frame-29">
                        <img class="home-02" src="home-020.svg" />
                        <div class="home">HOME</div>
                    </div>
                    <div class="frame-30">
                        <img class="users-profiles-right" src="users-profiles-right0.svg" />
                        <Link to={`/${username}/customers/all`} class="home2">CUSTOMERS</Link>
                    </div>
                    <div class="frame-31">
                        <img class="user-profile-left" src="user-profile-left0.svg" />
                        <Link to={`/${username}/suppliers/all`}>SUPPLIERS</Link>
                    </div>
                    <div class="frame-32">
                        <img class="users-profiles-01" src="users-profiles-010.svg" />
                        <Link to={`/${username}/agents/all`}>AGENTS</Link>
                    </div>
                    <div class="frame-33">
                        <img class="check-broken" src="check-broken0.svg" />
                        <Link to={`/${username}/todos/all`}>TODOS</Link>
                    </div>
                    <div class="frame-34">
                        <img class="arrow-rotate-right-01" src="arrow-rotate-right-010.svg" />
                        <Link to={`/${username}/closed`}>CLOSED PROJECTS</Link>
                    </div>
                    <div class="frame-35">
                        <img class="arrow-refresh-04" src="arrow-refresh-040.svg" />
                        <Link to={`/${username}/opened`}>OPEN PROJECTS</Link>
                    </div>
                    <div class="frame-36">
                        <img class="trend-up-01" src="trend-up-010.svg" />
                        {/* לא יודעת מה לכתוב בניתוב של זה */}
                        <Link>COMPLETED TRANSACTIONS</Link>
                    </div>
                    <div class="frame-372">
                        <img class="trend-up-012" src="trend-up-011.svg" />
                        <Link to={`/${username}/products`}>PRODUCTS</Link>
                    </div>
                </div>
                <div class="line-1"></div>
                <div class="line-2"></div>
                <div class="line-3"></div>
            </div>
            <Outlet />
        </nav>
    );
}