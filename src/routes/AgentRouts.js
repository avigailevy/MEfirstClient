import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { NavigationBar } from "../components/NavigationBar";

import { HomePage } from "../pages/Home";
import { TodosPage } from "../pages/Todos";
import { OpenProjectsPage } from "../pages/OpenProjects";

export function AgentRoutes({ isLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/:username"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <NavigationBar />
          </PrivateRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
        <Route path="todos/all" element={<TodosPage />} />
        <Route path="opened" element={<OpenProjectsPage />} />
      </Route>
    </Routes>
  );
}
