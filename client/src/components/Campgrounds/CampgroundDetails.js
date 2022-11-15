import { useState, useEffect, useContext, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import CampgroundDeleter from "./CampgroundDeleter";
import AuthContext from "../../Context/auth-context";
import classes from "./CampgroundDetails.module.css";
import DetailsMap from "../DetailsMap/DetailsMap";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { IconContext } from "react-icons";

const CampgroundDetails = () => {
  const { userInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [campDetails, setCampDetails] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);
  const [authorData, setAuthorData] = useState("");
  const [campImages, setCampImages] = useState([]);

  useEffect(() => {
    setisLoading(true);
    async function fetchAPIData() {
      const res = await fetch(`/campgrounddetails/${id}`);
      const data = await res.json();
      // console.log(data.foundCamp[0]);
      setCampDetails(data.foundCamp[0]);
      setAuthorData(data.foundCamp[0].author[0]);
      setCampImages(data.foundCamp[0].images);
      setisLoading(false);
    }

    fetchAPIData().catch(console.error);
    //use relative route since we defined the proxy to be port 5000 in package.json
  }, [id]);

  const detailsContent = (
    <div className={classes.detailsMain}>
      <section className={classes.detailsBody}>
        <div className={classes.detailElementContainer}>
          <h1 className={classes.detailsTitle}>{campDetails.title}</h1>
        </div>

        <h2 className={classes.detailsLocation}>{campDetails.location}</h2>

        <div className={classes.detailElementContainer}>
          <img
            className={classes.detailsImage}
            src={`${campImages[0]?.url}`}
            alt=""
          />
        </div>

        <div className={classes.detailElementContainer}>
          <div className={classes.detailsDescription}>
            <p>{campDetails.description}</p>
          </div>
        </div>
        <div className={classes.detailElementContainer}>
          <div className={classes.detailsPrice}>
            <p>Price: ${campDetails.price} (Per Night)</p>
          </div>
        </div>
        <div className={classes.detailElementContainer}>
          <div className={classes.detailsAuthor}>
            <p>Listed by: {authorData.username}</p>
          </div>
        </div>

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
      </section>
      <div className={classes.detailsMapContainer} />
      {<DetailsMap data={campDetails} />}{" "}
    </div>
  );

  return (
    <Fragment>
      {isLoading && <p>Loading Campgrounds for you...</p>}
      <div className={classes.backButton}>
        <Link to="/campgrounds">
          <IconContext.Provider value={{ color: "black", size: "2rem" }}>
            <div>
              <BsBoxArrowInLeft />
            </div>
          </IconContext.Provider>
        </Link>
      </div>
      {!isLoading && detailsContent}
    </Fragment>
  );
};

export default CampgroundDetails;
