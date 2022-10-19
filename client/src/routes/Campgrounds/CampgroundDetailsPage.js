import CampgroundDetails from "../../components/Campgrounds/CampgroundDetails";
import ReviewForm from "../../components/Campgrounds/Reviews/ReviewForm";
import ReviewsList from "../../components/Campgrounds/Reviews/ReviewsList";
import { React, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/auth-context";

const CampgroundDetailsPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
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
  );
};

export default CampgroundDetailsPage;
