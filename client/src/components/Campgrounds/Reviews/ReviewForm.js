import { React, Fragment, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewContext from "../../../Context/review-context";

const ReviewForm = () => {
  const { reviews, setReviews } = useContext(ReviewContext);
  const [ratingValue, setRatingValue] = useState("3");
  const reviewBodyRef = useRef();

  const { id } = useParams();
  const navigate = useNavigate();

  const ratingChangeHandler = (e) => {
    setRatingValue(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const sendAPIData = async (reviewData) => {
      const options = {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json",
        },
      };
      await fetch(`/campground/${id}/reviews`, options);
    };

    sendAPIData({
      rating: ratingValue,
      body: reviewBodyRef.current.value,
    });
    // setReviews((review) => {
    //   reviews: [...reviews];
    // });
    reviewBodyRef.current.value = "";
    // navigate(`/campgrounds/${id}`);
  };

  return (
    <Fragment>
      <form onSubmit={formSubmitHandler}>
        <div>
          <div>
            <label htmlFor="range">Rating: {ratingValue}</label>
          </div>
          <input
            type="range"
            name="rating"
            defaultValue={ratingValue}
            min="1"
            max="5"
            step="1"
            onChange={ratingChangeHandler}
          />
        </div>

        <div>
          <div>
            <label htmlFor="texarea">Review:</label>
          </div>
          <textarea name="body" ref={reviewBodyRef}></textarea>
        </div>
        <button>Submit</button>
      </form>
    </Fragment>
  );
};

export default ReviewForm;
