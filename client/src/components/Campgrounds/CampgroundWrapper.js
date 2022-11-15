import React from "react";
import classes from "./CampgroundList.module.css";

const CampgroundWrapper = (props) => {
  return <div className={classes.campContainer}>{props.children}</div>;
};

export default CampgroundWrapper;
