import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/auth-context";
import classes from "./LogoutButton.module.css";

const LogoutButton = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const sendLogoutRequest = async () => {
      await fetch("/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    };
    sendLogoutRequest();
    setIsLoggedIn(false);
  };
  return (
    <Fragment>
      <Link
        className={classes.NavLink}
        to="campgrounds"
        onClick={logoutHandler}
      >
        Logout
      </Link>
    </Fragment>
  );
};

export default LogoutButton;
