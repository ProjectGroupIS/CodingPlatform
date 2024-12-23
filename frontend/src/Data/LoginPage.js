import { FaUser,FaLock } from "react-icons/fa";
import React from 'react';;


export default function LoginForm(){
  return (
    <div className='wrapper'>
        <form action="/auth/login">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder='Username' required />
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password' required />
                <FaLock className='icon'/>
            </div>
            <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password</a>
            </div>

            <button type="submit">Login</button>
            <div className="register-link">
            <p>don't have an account?<a href='#'>Register</a></p></div>
            </form>
            </div>
  );
};

