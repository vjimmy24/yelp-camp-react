import { React, Fragment, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ReviewForm = () => {
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
      const res = await fetch(`/campground/${id}/reviews`, options);
      const data = await res.json();
    };

    sendAPIData({
      rating: ratingValue,
      body: reviewBodyRef.current.value,
    });
    reviewBodyRef.current.value = "";
    navigate(`/campgrounds/${id}`);
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