import React, { Fragment } from "react";
import LoginForm from "../../components/Auth/LoginForm";
import AuthImage from "../../components/Auth/AuthImage";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <body className={classes.body}>
      {/* <AuthImage /> */}
      <LoginForm />
    </body>
  );
};

export default LoginPage;
