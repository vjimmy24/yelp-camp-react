import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./Campground.module.css";

const Campground = (props) => {
  return (
    <Fragment>
      <div className={classes.campgroundContainer}>
        <div className={classes.imageContainer}>
          <img
            className={classes.campImage}
            src={`${props.image.url}`}
            alt=""
          />
        </div>
        <div className={classes.campDetails}>
          <p className={classes.campTitle}> {props.title}</p>
          <div>
            {props.location}
            <div>Price: {props.price}</div>

            <div>
              <Link className={classes.detailsLink} to={`${props.id}`}>
                Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Campground;
