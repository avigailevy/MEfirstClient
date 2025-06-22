import { Routes, Route } from "react-router-dom";
import { Login } from "../components/loginAddUser/Login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
