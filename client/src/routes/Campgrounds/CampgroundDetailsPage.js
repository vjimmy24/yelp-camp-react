import CampgroundDetails from "../../components/Campgrounds/CampgroundDetails";
import ReviewForm from "../../components/Campgrounds/Reviews/ReviewForm";
import ReviewsList from "../../components/Campgrounds/Reviews/ReviewsList";
import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/auth-context";
import ReviewContext from "../../Context/review-context";

const CampgroundDetailsPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  return (
    <ReviewContext.Provider value={{ reviews, setReviews }}>
      <div>
        <CampgroundDetails />

        <h2>Reviews</h2>
        {!isLoggedIn && (
          <div>
            {" "}
            <p>
              Want to leave a review? <Link to="/login">Login</Link> or{" "}
              <Link to="/register">Register</Link>
            </p>
          </div>
        )}

        <ReviewsList />
        {isLoggedIn && <h2>Want to leave a review?</h2>}
        {isLoggedIn && <ReviewForm />}
      </div>
    </ReviewContext.Provider>
  );
};

export default CampgroundDetailsPage;
