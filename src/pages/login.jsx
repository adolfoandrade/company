import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from 'axios';

//import "./styles.css";
import "./../App.css";

function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    axios.post('https://companyapp20231212003216.azurewebsites.net/Users/authenticate', {
      username: uname.value,
      password: pass.value
    })
    .then(function (response) {
      console.log(response);
      setToken(response.data.token);
      navigate("/", { replace: true });
    })
    .catch(function (error) {
      alert(error.message);
      console.log(error);
    });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default Login;
