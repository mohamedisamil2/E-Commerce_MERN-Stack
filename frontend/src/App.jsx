import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./assets/components/Navbar";

function App() {
  return (
    <div className="container mx-auto h-full w-full absolute bottom-0 left-0 inset-0 -z-10 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]">
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
