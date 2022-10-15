import React, { Fragment } from "react";
import CreateCampground from "../../components/Campgrounds/CampgroundForm/CreateCampground";

const NewCampground = () => {
  return (
    <Fragment>
      <h1>Want to list your campground?</h1>
      <CreateCampground />
    </Fragment>
  );
};

export default NewCampground;
