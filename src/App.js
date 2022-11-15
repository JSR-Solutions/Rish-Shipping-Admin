import Admin from "./pages/Admin";
import Login from "./pages/login/login";
import Ports from "./pages/Ports";
import Bookings from "./pages/Bookings";
import Company from "./pages/Companies";
import Shippers from "./pages/Shippers";
import Dashboard from "./pages/dashboard/dashboard";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SingleShipper from "./pages/Shippers/singleShipper";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="" element={<Admin />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/shippers" element={<Shippers />} />
            <Route path="/shippers/:shipperId" element={<SingleShipper/>}/>
            <Route path="/ports" element={<Ports />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/companies" element={<Company />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
