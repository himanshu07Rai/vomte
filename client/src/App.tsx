import { Toaster } from "react-hot-toast";
import "./App.css";
import PageRoutes from "./PageRoute";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { setUser } from "./features/authSlice";

function App() {
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={true} />
      {/* <ToastContainer /> */}
      <PageRoutes />
    </>
  );
}

export default App;
