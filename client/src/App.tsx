import { Toaster } from "react-hot-toast";
import "./App.css";
import PageRoutes from "./PageRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={true} />
      {/* <ToastContainer /> */}
      <PageRoutes />
    </>
  );
}

export default App;
