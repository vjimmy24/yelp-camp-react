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
  useEffect(() => {
    setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      // console.log(data.foundCamp[0].author[0].username);
      setCampDetails(data.foundCamp[0]);
      setAuthorData(data.foundCamp[0].author[0]);
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
      <h1>{campDetails.title}</h1>

      {!isLoading && <h2>{campDetails.location}</h2>}

      <div>
        {!isLoading && <p>{campDetails.description}</p>}

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
