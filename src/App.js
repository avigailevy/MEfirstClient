
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { PublicRoutes } from "./routes/PublicRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { AgentRoutes } from "./routes/AgentRoutes";
import { useAuth } from '../context/AuthContext';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const { isLoggedIn, user } = useAuth();

  return (
    // <BrowserRouter>
    //   {userRole === "admin" && <AdminRoutes  userName={userName}/>}
    //   {userRole === "agent" && <AgentRoutes userName={userName} />}
    //   {!userRole && <PublicRoutes />}
    // </BrowserRouter>

    <>
      {!isLoggedIn && (
        <div className="login-register-links">
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/register" className="navbar-link">Register</Link>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} users={users} />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} users={users} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} users={users} />} />

        {/* Routes protégées */}
        <Route
          path="users/:userId"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Navigation setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="albums" element={<Albums />} />
          <Route path="albums/:albumId/photos" element={<Photos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
