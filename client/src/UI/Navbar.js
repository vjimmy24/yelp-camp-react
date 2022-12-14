import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import AuthContext from "../Context/auth-context";
import LogoutButton from "../routes/Auth/Logout/LogoutButton";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className={classes.nav_header}>
      <NavLink className={classes.logo} to="/">
        YelpCamp-R
      </NavLink>

      <nav className={classes.navBar}>
        <ul>
          <li className={classes.navItem}>
            <NavLink className={classes.NavLink} to="campgrounds">
              Campgrounds
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              className={classes.NavLink}
              to={!isLoggedIn ? "/login" : "campgrounds/new"}
            >
              Want to list your campground?
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav className={classes.navBar}>
        <ul>
          {!isLoggedIn && (
            <li className={classes.navItem}>
              <NavLink className={classes.NavLink} to="/login">
                Login
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li className={classes.navItem}>
              <NavLink className={classes.NavLink} to={`/register`}>
                Register
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li className={classes.navItem}>
              <LogoutButton className={classes.NavLink} />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
