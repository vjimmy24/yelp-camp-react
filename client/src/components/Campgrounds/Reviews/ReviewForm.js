import { React, Fragment, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewContext from "../../../Context/review-context";
import classes from "./ReviewForm.module.css";

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
    <section className={classes.reviewFormContainer}>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.reviewFormElement}>
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

        <div className={classes.reviewFormElement}>
          <div className={classes.reviewFormElement}>
            <label htmlFor="texarea">Review:</label>
          </div>
          <textarea
            className={classes.reviewTextArea}
            name="body"
            ref={reviewBodyRef}
          ></textarea>
        </div>
        <div className={classes.reviewFormElement}>
          <button className={classes.reviewButton}>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default ReviewForm;
