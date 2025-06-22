
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { PublicRoutes } from "./routes/PublicRoutes";
 import { AdminRoutes } from "./routes/AdminRoutes";
 import { AgentRoutes } from "./routes/AgentRoutes";

function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");

    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserRole(payload.role); // למשל 'admin' או 'agent'
      setUserName(payload?.username); 
    }
  }, []);

  return (
    <BrowserRouter>
      {userRole === "admin" && <AdminRoutes  userName={userName}/>}
      {userRole === "agent" && <AgentRoutes userName={userName} />}
      {!userRole && <PublicRoutes />}
    </BrowserRouter>
  );
}

export default App;
