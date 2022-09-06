import Login from "./pages/login/login";
import SideBar from "./SharedComponents/SideBar";
import Dashboard from "./pages/dashboard/dashboard";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sb" element={<SideBar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;