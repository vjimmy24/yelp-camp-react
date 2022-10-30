import React, { Fragment } from "react";
import classes from "./AuthImage.module.css";

const AuthImage = () => {
  return (
    <Fragment>
      <img
        className={classes.image}
        src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80"
        alt=""
      />
    </Fragment>
  );
};

export default AuthImage;
