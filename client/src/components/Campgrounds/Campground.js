import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Campground = (props) => {
  return (
    <Fragment>
      <p>
        {props.title}, Location:{props.location}, Price: {props.price}{" "}
        <Link to={`${props.id}`}>Details</Link>
      </p>
    </Fragment>
  );
};

export default Campground;
