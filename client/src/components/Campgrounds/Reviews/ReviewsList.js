import { React, Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Review from "./Review";
import ReviewContext from "../../../Context/review-context";
import classes from "./ReviewsList.module.css";

const ReviewsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, setReviews } = useContext(ReviewContext);
  useEffect(() => {
    // setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      // console.log(data.foundCamp[0].reviews);

      setReviews(data.foundCamp[0].reviews);
      // map((review) =>(
      //       <Review rating={review.rating} review={review.body} />
      //     ))
      //   );
    }
    fetchAPIData();
    // setisLoading(false);
    //PUTTING REVIEWS IN MIGHT CAUSE AN INFINITE LOOP!
  }, [id, reviews, setReviews]);
  //   console.log(reviewData);
  const reviewArray = reviews?.map((review) => (
    <div className={classes.reviewContainer} key={review._id}>
      <Review rating={review.rating} review={review.body} />
    </div>
  ));
  return <Fragment>{reviewArray}</Fragment>;
};

export default ReviewsList;
