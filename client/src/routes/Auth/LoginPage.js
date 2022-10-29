import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginPage.module.css";
import AuthContext from "../../Context/auth-context";

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);

  const usernameIsValid = username.trim() !== "";
  const passwordIsValid = password.trim() !== "";

  const usernameInputIsInvalid = !usernameIsValid && usernameTouched;
  const passwordInputIsInvalid = !passwordIsValid && passwordTouched;

  useEffect(() => {
    if (usernameIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [usernameIsValid, passwordIsValid]);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const usernameBlurHandler = (e) => {
    setUsernameTouched(true);
  };

  const passwordBlurHandler = (e) => {
    setPasswordTouched(true);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setUsernameTouched(true);
    setPasswordTouched(true);
    if (!formIsValid) {
      return;
    }
    const sendAPIData = async (userData) => {
      const options = {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      const res = await fetch("/login", options);
      const data = await res.json();
      console.log(data);
      setUserInfo(data);
    };
    // console.log(`login creds: username: ${username}, password:${password}`);
    setUsernameTouched(false);
    setPasswordTouched(false);
    setIsLoggedIn(true);
    sendAPIData({ username: username, password: password });
    // navigate(-1);
  };

  const getUserHandler = async () => {
    const res = await fetch("/getUser");
    const data = await res.json();
    console.log(data);
  };

  const usernameClass = usernameInputIsInvalid
    ? `${classes.formInputInvalid}`
    : "";
  const passwordClass = passwordInputIsInvalid
    ? `${classes.formInputInvalid}`
    : "";

  return (
    <Fragment>
      {" "}
      <h1>Welcome back, camper!</h1>
      <form action="" onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <div>
            <input
              className={usernameClass}
              type="text"
              name="username"
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
            />
          </div>

          {/* {usernameInputIsInvalid && (
            <div>
              <p>Username is not valid.</p>
            </div>
          )} */}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              className={passwordClass}
              type="password"
              name="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {/* {passwordInputIsInvalid && (
            <div>
              <p>Password is not valid.</p>
            </div>
          )} */}
          </div>
        </div>
        <div>
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </form>
      <Link to="/register">Not a user? Register here!</Link>{" "}
      <button onClick={getUserHandler}>Get User</button>
    </Fragment>
  );
};

export default LoginPage;
