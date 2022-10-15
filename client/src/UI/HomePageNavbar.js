import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <Fragment>
      <div className={classes.navBar}>
        <ul>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="/">
              Home
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="campgrounds">
              Campgrounds
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="campgrounds/new">
              Want to list your campground?
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="/login">
              Login
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Navbar;
