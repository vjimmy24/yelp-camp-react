import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CampgroundDeleter from "./CampgroundDeleter";

const CampgroundDetails = (props) => {
  const { id } = useParams();
  const [campDetails, setCampDetails] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      // console.log(data);
      setCampDetails(data.foundCamp[0]);
    }
    fetchAPIData().catch(console.error);
    setisLoading(false);
    //use relative route since we defined the proxy to be port 5000 in package.json
  }, [id]);
  const getUserHandler = async () => {
    async function fetchUserData() {
      const res = await fetch("/getUser");
      const data = await res.json();

      // console.log(data);
    }
    fetchUserData();
  };

  return (
    <div>
      <button onClick={getUserHandler}> button </button>
      <h1>Details Page</h1>

      {!isLoading && (
        <h2>
          {campDetails.title}, {campDetails.location}
        </h2>
      )}

      <div>
        {!isLoading && <p>Price: {campDetails.price} Per Night</p>}
        {!isLoading && <p>{campDetails.description}</p>}
      </div>
      <div>
        <Link to="/campgrounds">Campgrounds</Link>
      </div>
      <div>
        <CampgroundDeleter id={id} />
      </div>
    </div>
  );
};

export default CampgroundDetails;
