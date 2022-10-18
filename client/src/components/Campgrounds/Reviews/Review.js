import React, { Fragment } from "react";

const Review = (props) => {
  return (
    <Fragment>
      <div>
        <h3>Rating: {props.rating}</h3>
        <p>Review: {props.review}</p>
      </div>
    </Fragment>
  );
};

export default Review;
