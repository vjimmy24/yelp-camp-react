import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Campground = (props) => {
  return (
    <Fragment>
      <div>{props.title}</div> {props.location}
      <div></div> Price: {props.price}
      <div>
        <Link to={`${props.id}`}>Info</Link>
      </div>
    </Fragment>
  );
};

export default Campground;
