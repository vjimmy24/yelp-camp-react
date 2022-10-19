import React, { Fragment } from "react";
import CampgroundList from "../../components/Campgrounds/CampgroundList";
import { Link } from "react-router-dom";

const CampgroundsList = () => {
  return (
    <Fragment>
      <h1>Campgrounds</h1>
      <div>
        <Link to="new">Want to list a new campground?</Link>
      </div>
      <CampgroundList />
    </Fragment>
  );
};

export default CampgroundsList;
