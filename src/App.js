
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { PublicRoutes } from "./routes/PublicRoutes";
import { Login } from "./components/loginAddUser/Login";

// import { AdminRoutes } from "./routes/AdminRoutes";
// import { AgentRoutes } from "./routes/AgentRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");

    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role); 
    }
  }, []);

  return <Login/>
}

export default App;
