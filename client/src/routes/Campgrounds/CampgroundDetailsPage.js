import CampgroundDetails from "../../components/Campgrounds/CampgroundDetails";
import ReviewForm from "../../components/Campgrounds/Reviews/ReviewForm";
import ReviewsList from "../../components/Campgrounds/Reviews/ReviewsList";
import React from "react";
import { Link } from "react-router-dom";

const CampgroundDetailsPage = () => {
  return (
    <div>
      <CampgroundDetails />
      <Link to="edit">
        <button>Edit Campground</button>
      </Link>
      <h2>Reviews</h2>
      <ReviewsList />
      <h2>Want to leave a review?</h2>
      <ReviewForm />
    </div>
  );
};

export default CampgroundDetailsPage;
