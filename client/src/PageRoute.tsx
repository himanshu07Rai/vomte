import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import toast from "react-hot-toast";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePoll from "./pages/CreatePoll";
import Home from "./pages/Home";

function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/createPoll" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
