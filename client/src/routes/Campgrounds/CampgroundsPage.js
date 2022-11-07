import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import CampgroundList from "../../components/Campgrounds/CampgroundList";
import ClusterMap from "../../components/ClusterMap/ClusterMap";

const CampgroundsList = () => {
  return (
    <Fragment>
      {/* <div><Link to="new">Want to list a new campground?</Link></div> */}
      <CampgroundList />
    </Fragment>
  );
};

export default CampgroundsList;
