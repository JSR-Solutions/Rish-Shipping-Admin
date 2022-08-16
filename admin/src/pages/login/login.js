import React from 'react'
import Img from "../../Assets/signin.png";
import "../../styles/login/login.css";
function Login() {
  return (
    <div className='login_main'>
        <div className='left_login'>
            <img className='login_img' src={Img}></img>
        </div>
        <div className='right_login'>
            <h3>Login to Admin Panel</h3>
            <p>Please sign-in to your account</p>
            <div className='input_fieldDiv'>
            <h6>Email</h6> 
            <input className='input_field' type="text" placeholder='abc.admin@gmail.com'/>
            </div>
            <div className='input_fieldDiv'>
            <h6>Password</h6>
            <h5>Forgot Password?</h5> 
            <input className='input_field' type="password" />
            </div>
            <button className='signin_btn'>Sign In</button>
        </div>
    </div>
  )
}

export default Login