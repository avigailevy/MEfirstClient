// import { useParams, Link, Outlet } from 'react-router-dom';
// import { useState } from 'react';
// import { useAuth } from "../../context/AuthContext";
// import '../../css/NavigationBar.css'
// import { AlignJustify, CircleCheckBig, CircleX, Forward, House, Package, PackageOpen, Reply, ShoppingCart, UserRound } from "lucide-react";

// export function NavigationBar() {

//     const { username } = useParams();
//     const [barStatus, setBarStatus] = useState('open');
//     const { user } = useAuth();

//     return (
//         <nav className="navbar">
//             {barStatus === 'open' ? (
//                 <div className="frame-73">
//                     <div className="frame-37">
//                         <AlignJustify onClick={() => setBarStatus('close')} />
//                         <div className="frame-29">
//                             <House />
//                             <Link to={`/${username}/home `} className="home"> HOME</Link>
//                         </div>
//                         <div className="frame-30">
//                             <Reply /> 
//                             <Link to={`/${username}/contacts/customers`} className="home2">CUSTOMERS</Link>
//                         </div>
//                         <div className="frame-31">
//                             <Forward />
//                             <Link to={`/${username}/contacts/suppliers`} className="home2"> SUPPLIERS</Link>
//                         </div>
//                         {user && user.role === 'admin' && (
//                             <div className="frame-32">
//                                 <UserRound />
//                                 <Link to={`/${username}/users/agents`} className="home2"> AGENTS</Link>
//                             </div>
//                         )}
//                         <div className="frame-33">
//                             <CircleCheckBig />
//                             <Link to={`/${username}/todos`} className="home2"> TODOS</Link>
//                         </div>
//                         <div className="frame-34">
//                             <Package />
//                             <Link to={`/${username}/projects/close`} className="home2"> CLOSED PROJECTS</Link>
//                         </div>
//                         <div className="frame-35">
//                             <PackageOpen />
//                             <Link to={`/${username}/projects/open`} className="home2">OPEN PROJECTS</Link>
//                         </div>
//                         {user && user.role === 'admin' && (
//                             <div className="frame-36">
//                                 <CircleX />
//                                 {/* לא יודעת מה לכתוב בניתוב של זה */}
//                                 <Link className="home2">COMPLETED TRANSACTIONS</Link>
//                             </div>
//                         )}
//                         <div className="frame-372">
//                             <ShoppingCart />
//                             <Link to={`/${username}/products`} className="home2">PRODUCTS</Link>
//                         </div>
//                     </div>
//                 </div>) : (
//                 <div className="frame-37">
//                     <div className="frame-38">
//                         <AlignJustify onClick={() => setBarStatus('open')} />
//                         <div className="frame-29">
//                             <Link to={`/${username}/home`} className="home2">
//                                 <House />
//                             </Link>
//                         </div>
//                         <div className="frame-30">
//                             <Link to={`/${username}/contacts/customers`}>
//                                 <Reply /> 
//                             </Link>
//                         </div>
//                         <div className="frame-31">
//                             <Link to={`/${username}/contacts/suppliers`}>
//                                 <Forward />
//                             </Link>
//                         </div>
//                         {user && user.role === 'admin' && (
//                             <div className="frame-32">
//                                 <Link to={`/${username}/users/agents`}>
//                                     <UserRound />
//                                 </Link>
//                             </div>
//                         )}
//                         <div className="frame-33">
//                             <Link to={`/${username}/todos`}>
//                                 <CircleCheckBig />
//                             </Link>
//                         </div>
//                         <div className="frame-34">
//                             <Link to={`/${username}/projects/close`}>
//                                 <Package />
//                             </Link>
//                         </div>
//                         <div className="frame-35">
//                             <Link to={`/${username}/projects/open`}>
//                                 <PackageOpen />
//                             </Link>
//                         </div>
//                         {user && user.role === 'admin' && (
//                             <div className="frame-36">
//                                 {/* לא יודעת מה לכתוב בניתוב של זה */}
//                                 <Link>
//                                     <CircleX />
//                                 </Link>
//                             </div>
//                         )}
//                         <div className="frame-372">
//                             <Link to={`/${username}/products`}>
//                                 <ShoppingCart />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <Outlet />
//         </nav>
//     );
// }
// export default NavigationBar;

import { useParams, Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import '../../css/NavigationBar.css';
import {
  AlignJustify, CircleCheckBig, CircleX, Forward, House,
  Package, PackageOpen, Reply, ShoppingCart, UserRound
} from "lucide-react";

export function NavigationBar() {
  const { username } = useParams();
  const [barOpen, setBarOpen] = useState(true);
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className={`sidebar ${barOpen ? 'open' : 'closed'}`}>
        <div className="menu-toggle" onClick={() => setBarOpen(!barOpen)}>
          <AlignJustify />
        </div>

        <Link to={`/${username}/home`} className="menu-item">
          <House />
          <span className="menu-text">Home</span>
        </Link>

        <Link to={`/${username}/contacts/customers`} className="menu-item">
          <Reply />
          <span className="menu-text">Customers</span>
        </Link>

        <Link to={`/${username}/contacts/suppliers`} className="menu-item">
          <Forward />
          <span className="menu-text">Suppliers</span>
        </Link>

        {user?.role === 'admin' && (
          <Link to={`/${username}/users/agents`} className="menu-item">
            <UserRound />
            <span className="menu-text">Agents</span>
          </Link>
        )}

        <Link to={`/${username}/todos`} className="menu-item">
          <CircleCheckBig />
          <span className="menu-text">Todos</span>
        </Link>

        <Link to={`/${username}/projects/close`} className="menu-item">
          <Package />
          <span className="menu-text">Closed Projects</span>
        </Link>

        <Link to={`/${username}/projects/open`} className="menu-item">
          <PackageOpen />
          <span className="menu-text">Open Projects</span>
        </Link>

        {user?.role === 'admin' && (
          <Link to={`/${username}/transactions/completed`} className="menu-item">
            <CircleX />
            <span className="menu-text">Completed Transactions</span>
          </Link>
        )}

        <Link to={`/${username}/products`} className="menu-item">
          <ShoppingCart />
          <span className="menu-text">Products</span>
        </Link>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </nav>
  );
}

export default NavigationBar;
