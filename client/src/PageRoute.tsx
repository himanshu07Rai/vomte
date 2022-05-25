import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import toast from "react-hot-toast";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const notify = (a: string) =>
  toast("Hello Darkness!", {
    icon: "👏",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
const Home = () => {
  return (
    <>
      <button onClick={() => notify("ho")}>Make me a toast</button>
    </>
  );
};

function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PageRoutes;
