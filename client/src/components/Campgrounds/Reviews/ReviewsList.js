import { React, Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Review from "./Review";

const ReviewsList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(null);
  useEffect(() => {
    // setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      //   console.log(data.foundCamp[0].reviews);
      setReviewData(data.foundCamp[0]);
      // map((review) =>(
      //       <Review rating={review.rating} review={review.body} />
      //     ))
      //   );
    }
    fetchAPIData();
    // setisLoading(false);
  }, [id]);
  //   console.log(reviewData);
  const reviews = reviewData?.reviews?.map((review) => (
    <Review rating={review.rating} review={review.body} />
  ));
  //   console.log(reviews);
  return <Fragment>{reviews}</Fragment>;
};

export default ReviewsList;
