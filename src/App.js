import {  Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import  Login  from './components/loginAddUser/Login';
import Navigation  from './components/homePage/NavigationBar';
import DashBoard  from './components/homePage/DashBoard';



function App() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload?.username); 
    }
  }, []);

  return (
      <Routes>

        <Route path="/" element={ <Login/> }/>
        <Route path="/login" element={<Login />} />
       
          <Route
          path="/:userName"
          element={
           
              <Navigation  username={userName} />
          
          }
        >
          <Route path="dashBoard" element={<DashBoard />} />

        </Route>
      </Routes>
  );
}

export default App;
