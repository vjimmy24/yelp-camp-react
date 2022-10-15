import CampgroundDetails from "../../components/Campgrounds/CampgroundDetails";
import React from "react";
import { Link } from "react-router-dom";

const CampgroundDetailsPage = () => {
  return (
    <div>
      <CampgroundDetails />
      <Link to="edit">
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default CampgroundDetailsPage;
