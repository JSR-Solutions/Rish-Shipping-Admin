import React, { useState } from "react";
import Img from "../../Assets/signin.png";
import "../../styles/login/login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const login = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:8000/admin/api/auth/login`,
        data: {
          email: credentials.email,
          password: credentials.password,
        },
      });
      toast.success("Successfully logged in", {
        position: "bottom-center",
        autoClose: 2000,
      });
      reactLocalStorage.set("rish-admin-token", response.data.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login_main">
      <div className="left_login">
        <img className="login_img" src={Img} alt="Login page"></img>
      </div>
      <div className="right_login">
        <h3>Login to Admin Panel</h3>
        <p>Please sign-in to your account</p>
        <div className="input_fieldDiv">
          <h6>Email</h6>
          <input
            className="input_field"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="abc.admin@gmail.com"
          />
        </div>
        <div className="input_fieldDiv">
          <h6>Password</h6>
          <h5>Forgot Password?</h5>
          <input
            className="input_field"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={login} className="signin_btn">
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
