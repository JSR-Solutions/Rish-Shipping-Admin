import Login from "./pages/login/login";
import Ports from "./pages/Ports";
import Bookings from "./pages/Bookings";
import Company from "./pages/Companies";
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
          <Route path="/ports" element={<Ports />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/companies" element={<Company />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
