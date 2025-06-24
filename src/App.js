import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import { Products } from "./components/products/Products";
import { Link } from "react-router-dom";
import { HomePage } from "./components/homePage/HomePage";
import { Projects } from "./components/projects/Projects";
import { Customers } from "./components/contacts/Customers";
import { Suppliers } from "./components/contacts/Suppliers";
import { Agents } from "./components/agents/Agents";
import { Todos } from "./components/todos/Todos";
import { Login } from "./components/loginAddUser/Login";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {!isLoggedIn && (
        <div className="login-register-links">
          <Link to="/login" className="navbar-link">Login</Link>
        </div>
      )}

      <Routes>
        <Route path='login' element={<Login />} />
        <Route
          path="/"
        />
        <Route path="/:username">
          <Route path="home" element={<HomePage />} />
          <Route path="products" element={<Products />} />
          <Route path="projects/:open" element={<Projects projectStatus={'open'} />} />
          <Route path="projects/:close" element={<Projects projectStatus={'close'} />} />
          <Route path="contacts/customers" element={<Customers />} />
          <Route path="contacts/Suppliers" element={<Suppliers />} />
          <Route path="todos" element={<Todos />} />
          <Route path="users" >
            <Route path="agents" element={<Agents />} >
              <Route path=":agentName/projects" element={<Projects projectStatus={'open'} />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
