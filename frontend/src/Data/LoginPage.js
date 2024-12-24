import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginForm() {
  return (
    <div className="main-container">
      <div className="wrapper">
        <form>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="">Forgot Password</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="google-btn">
            {/* <button type="button" onClick={()=>{
                return "http://localhost:8080/auth/google"
            } }>Login with Google</button>
             */}
             <button
  type="button"
  onClick={() => {
    window.location.href = "http://localhost:8080/auth/google";
  }}
>
  Login with Google
</button>

             
          </div>
          <div className="register-link">
          </div>
        </form>
      </div>
    </div>
  );
}