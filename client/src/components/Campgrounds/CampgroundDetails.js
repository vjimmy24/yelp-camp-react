import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CampgroundDeleter from "./CampgroundDeleter";
import AuthContext from "../../Context/auth-context";
import classes from "./CampgroundDetails.module.css";

const CampgroundDetails = (props) => {
  const { userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [campDetails, setCampDetails] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [authorData, setAuthorData] = useState("");
  const [campImages, setCampImages] = useState([]);
  useEffect(() => {
    setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      console.log(data.foundCamp);
      setCampDetails(data.foundCamp[0]);
      setAuthorData(data.foundCamp[0].author[0]);
      setCampImages(data.foundCamp[0].images);
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
    <body className={classes.detailsBody}>
      <div className={classes.detailElementContainer}>
        <img
          className={classes.detailsImage}
          src={`${campImages[0]?.url}`}
          alt=""
        />
      </div>
      <div className={classes.detailElementContainer}>
        <h2 className={classes.detailsTitle}>{campDetails.title}</h2>
      </div>

      {!isLoading && (
        <h3 className={classes.detailsLocation}>{campDetails.location}</h3>
      )}

      <div className={classes.detailElementContainer}>
        {!isLoading && <p>{campDetails.description}</p>}
      </div>
      <div className={classes.detailElementContainer}>
        {!isLoading && <p>Price: ${campDetails.price} (Per Night)</p>}
      </div>
      <div>{!isLoading && <p>Listed by: {authorData.username}</p>}</div>
      {/* <div>
        <Link to="/campgrounds">Campgrounds</Link>
      </div> */}

      {userInfo._id === authorData._id && (
        <Link to="edit">
          <button>Edit Campground</button>
        </Link>
      )}
      {userInfo._id === authorData._id && (
        <div>
          <CampgroundDeleter id={id} />
        </div>
      )}
    </body>
  );
};

export default CampgroundDetails;
