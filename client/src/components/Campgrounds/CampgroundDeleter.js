import React, { Fragment } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

const CampgroundDeleter = (props) => {
  const navigate = useNavigate();
  const campgroundDeleteHandler = async () => {
    const options = {
      method: "DELETE",
    };
    navigate("/campgrounds");
    try {
      await fetch(`/campground/${props.id}/delete`, options);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Fragment>
      <button onClick={campgroundDeleteHandler}>Delete</button>
    </Fragment>
  );
};

export default CampgroundDeleter;
