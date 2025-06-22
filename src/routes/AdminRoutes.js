import { Route, Routes } from "react-router-dom";
import NavigationBar from "../components/homePage/NavigationBar";
import DashBoard from "../components/homePage/DashBoard";



export function AdminRoutes({ username }) {
  return (
    <Routes>
        <Route
      path={`/${username}`}
      element={<NavigationBar  />}
      >
     <Route path="dashBoard" element={<DashBoard />} />
     </Route>
    </Routes>
    
  );
}
export default AdminRoutes;