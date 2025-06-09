import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';

export function NavigationBar() {

    const { userId } = useParams();
    const navigate = useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/login", { replace: true });
    };

    return (
        <div class="frame-73">
            <div class="frame-37">
                <div class="frame-29">
                    <img class="home-02" src="home-020.svg" />
                    <div class="home">HOME</div>
                </div>
                <div class="frame-30">
                    <img class="users-profiles-right" src="users-profiles-right0.svg" />
                    <Link to={``} class="home2">CUSTOMERS</Link>
                </div>
                <div class="frame-31">
                    <img class="user-profile-left" src="user-profile-left0.svg" />
                    <div class="home2">SUPPLIERS</div>
                </div>
                <div class="frame-32">
                    <img class="users-profiles-01" src="users-profiles-010.svg" />
                    <div class="home2">WORKERS</div>
                </div>
                <div class="frame-33">
                    <img class="check-broken" src="check-broken0.svg" />
                    <div class="home2">TODOS</div>
                </div>
                <div class="frame-34">
                    <img class="arrow-rotate-right-01" src="arrow-rotate-right-010.svg" />
                    <div class="home2">CLOSED PROJECTS</div>
                </div>
                <div class="frame-35">
                    <img class="arrow-refresh-04" src="arrow-refresh-040.svg" />
                    <div class="home2">OPEN PROJECTS</div>
                </div>
                <div class="frame-36">
                    <img class="trend-up-01" src="trend-up-010.svg" />
                    <div class="home2">COMPLETED TRANSACTIONS</div>
                </div>
                <div class="frame-372">
                    <img class="trend-up-012" src="trend-up-011.svg" />
                    <div class="home2">PRODUCTS</div>
                </div>
                <div class="frame-38">
                    <img class="trend-up-013" src="trend-up-012.svg" />
                    <div class="home2">SUMMARIES</div>
                </div>
            </div>
            <div class="line-1"></div>
            <div class="line-2"></div>
            <div class="line-3"></div>
        </div>

    );
}