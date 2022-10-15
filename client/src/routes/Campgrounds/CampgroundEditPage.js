import { React, Fragment } from "react";
import { useParams } from "react-router-dom";
import EditCampground from "../../components/Campgrounds/CampgroundForm/EditCampground";

const CampgroundEditPage = () => {
  return (
    <Fragment>
      <EditCampground></EditCampground>
    </Fragment>
  );
};

export default CampgroundEditPage;
