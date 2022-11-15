import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import DetailsMap from "../DetailsMap/DetailsMap";
import classes from "./Campground.module.css";

const Campground = (props) => {
  // const campData = {
  //   image: props.image.url,
  //   price: props.price,
  //   title: props.title,
  //   location: props.location,
  //   latitude: props.geometry.coordinates[1],
  //   longitude: props.geometry.coordinates[0],
  // };
  return (
    <div className={classes.campgroundContainer}>
      <div className={classes.imageContainer}>
        <img className={classes.campImage} src={`${props.image.url}`} alt="" />
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
  );
};

export default Campground;
