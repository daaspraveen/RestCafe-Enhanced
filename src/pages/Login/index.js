import { Navigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { PiEyes } from "react-icons/pi";
import styled from "styled-components";

import "./style.css";

const Button = styled.button`
  transform: rotate(${(props) => (!props.isShowPass ? "180" : "0")}deg);
`;

const Login = () => {
  // console.log('in login')

  const cookieToken = Cookies.get("login_token");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setPassShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const doLoginApi = async (userData) => {
    setErrorMsg("");
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const resp = await fetch(url, options);
      if (resp.ok) {
        const data = await resp.json();
        console.log(data.jwt_token);
        Cookies.set('login_token', data.jwt_token, {expires: 2})
        setErrorMsg("Logging In...");
        
      } else {
        const errData = await resp.json();
        console.log(errData.error_msg)
        setErrorMsg(errData.error_msg || "username and password didn't match");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setErrorMsg("Something went wrong, Try again later");
    }
  };

  const doLoginFunc = (e) => {
    e.preventDefault();
    const userInputDetails = {
      username: username,
      password: password,
    };
    console.log(userInputDetails);
    doLoginApi(userInputDetails);
  };

  if (cookieToken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-head-box">
          <img
            src="/resto-cafe-logo.svg"
            alt="website logo"
            className="login-logo-img"
          />
          <h1 className="login-head">Resto Cafe</h1>
        </div>
        <form className="login-form" onSubmit={doLoginFunc}>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            className="login-input"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="password">PASSWORD</label>
          <div className="pass-box">
            <input
              type={showPass ? "text" : "password"}
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              className="showpass-icon"
              isShowPass={showPass}
              title="Show Password"
              onClick={() => setPassShow((prev) => !prev)}
            >
              <PiEyes size={25} />
            </Button>
          </div>
          <input
            type="submit"
            value="Login"
            disabled={!username && !password}
          />
          <p className="login-errorMsg" style={{color: errorMsg === "Logging In..." ? "green" : "orangered"}}>{errorMsg}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
