import React, { Fragment } from "react";
import CampgroundList from "../../components/Campgrounds/CampgroundList";
import { Link } from "react-router-dom";

const CampgroundsList = () => {
  return (
    <Fragment>
      <h1>Campgrounds List</h1>
      <Link to="/">Home</Link>
      <div>
        <Link to="new">Create a new campground?</Link>
      </div>
      <CampgroundList />
    </Fragment>
  );
};

export default CampgroundsList;
