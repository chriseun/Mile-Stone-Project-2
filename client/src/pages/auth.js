import React, { useState } from "react";
//replacement for fetch API, easier to handle
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
    return <div></div>;
};

const Register= () => {
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")

    return (
        <div className="auth-container">
          <form>
            <h2> Register</h2>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                 type="text"
                 id="username"
                 value={username}
                 onChage={(event) => setUsername(event.target.value) }></input>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                 type="text" 
                 id="password"
                 value={password}
                 onChage={(event) => setPassword(event.target.value)}></input>
            </div>
          </form>

        </div>
    )
}