import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { NavigationBar } from "../components/NavigationBar";

import { HomePage } from "../pages/Home";
import { CustomersPage } from "../pages/Customers";
import { SuppliersPage } from "../pages/Suppliers";
import { AgentsPage } from "../pages/Agents";
import { TodosPage } from "../pages/Todos";
import { ClosedProjectsPage } from "../pages/ClosedProjects";
import { OpenProjectsPage } from "../pages/OpenProjects";
import { ProductsPage } from "../pages/Products";
import { CompletedTransactionsPage } from "../pages/CompletedTransactions";

export function AdminRoutes({ isLoggedIn }) {
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
        <Route path="customers/all" element={<CustomersPage />} />
        <Route path="suppliers/all" element={<SuppliersPage />} />
        <Route path="agents/all" element={<AgentsPage />} />
        <Route path="todos/all" element={<TodosPage />} />
        <Route path="closed" element={<ClosedProjectsPage />} />
        <Route path="opened" element={<OpenProjectsPage />} />
        <Route path="completed" element={<CompletedTransactionsPage />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}
