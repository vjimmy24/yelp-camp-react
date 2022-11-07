import React, { Fragment } from "react";
import Test from "../components/test/Test";
import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <Fragment>
      <div>
        <h1 className={classes.header}>Welcome to YelpCamp!</h1>
        <div className={classes.flexContainer}>
          <p className={classes.lead}>
            YelpCamp is a website designed to satisfy your camping hunger! At
            YelpCamp, you will find beautiful, scenic, and atmospheric campsites
            at different pricepoints that will amaze you.
            <div className={classes.bodyBottom}>
              A perfect fit, if you ask me.
            </div>
            <div>
              {/* <button>
                <Link className={classes.campgroundButton} to="/campgrounds">
                  View Campgrounds
                </Link>
              </button> */}
            </div>
          </p>{" "}
        </div>
      </div>

      {/* <Test /> */}
    </Fragment>
  );
};

export default HomePage;
