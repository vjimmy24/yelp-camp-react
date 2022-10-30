import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./AuthForm.module.css";

const RegisterForm = () => {
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

    const sendAPIData = async (userData) => {
      const options = {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch("/register", options);
      const data = await res.json();
    };

    setUsernameTouched(true);
    setPasswordTouched(true);
    if (!formIsValid) {
      return;
    }
    console.log(`register creds: username: ${username}, password:${password}`);
    sendAPIData({ username: username, password: password });
    setUsernameTouched(false);
    setPasswordTouched(false);
  };

  const usernameClass = usernameInputIsInvalid
    ? `${classes.formInputInvalid}`
    : `${classes.formInput}`;
  const passwordClass = passwordInputIsInvalid
    ? `${classes.formInputInvalid}`
    : `${classes.formInput}`;

  return (
    <div className={classes.formBody}>
      <h1>Welcome to YelpCamp!</h1>
      <h2>Register</h2>
      <form className={classes.authForm} action="" onSubmit={formSubmitHandler}>
        <div className={classes.formElement}>
          <label className={classes.formLabel} htmlFor="username">
            Username
          </label>
          <input
            className={usernameClass}
            type="text"
            name="username"
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
          />
          {/* {usernameInputIsInvalid && (
            <div>
              <p>Username is not valid.</p>
            </div>
          )} */}
        </div>
        <div className={classes.formElement}>
          <label className={classes.formLabel} htmlFor="password">
            Password
          </label>
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
        <div className={classes.buttonContainer}>
          <button className={classes.formSubmitButton} disabled={!formIsValid}>
            Signup <i className={classes.arrow}></i>
          </button>
        </div>
      </form>
      <div className={classes.buttonContainer}>
        <Link className={classes.Link} to="/login">
          Already registered? Login!
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
