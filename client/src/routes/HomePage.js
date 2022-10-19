import React, { Fragment } from "react";
import Test from "../components/test/Test";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Fragment>
      <div className={classes.main}>
        <h1 className={classes.header}>Welcome to YelpCamp!</h1>
        <div className={classes.flexContainer}>
          {" "}
          <p className={classes.lead}>
            YelpCamp is a website designed to satisfy your camping hunger! At
            YelpCamp, you can find beautiful, scenic, and atmospheric campsites
            at different pricepoints that will amaze you. A perfect fit, if you
            ask me.
          </p>{" "}
        </div>
      </div>

      {/* <Test /> */}
    </Fragment>
  );
};

export default HomePage;
