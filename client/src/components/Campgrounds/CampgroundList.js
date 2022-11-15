import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Campground from "./Campground";
import classes from "./CampgroundList.module.css";
import CampContext from "../../Context/camp-context";
import ClusterMap from "../ClusterMap/ClusterMap";
import HoverContext from "../../Context/hover-context";
import CampgroundWrapper from "./CampgroundWrapper";

const CampgroundList = () => {
  const [campData, setCampData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    async function fetchAPIData() {
      const res = await fetch("/campground");
      const data = await res.json();
      // console.log(data);
      setCampData(data);
      setIsLoading(false);
    }
    fetchAPIData();
    //use relative route since we defined the proxy to be port 5000 in package.json\
    //Setting campdata as a dependency allows us to see the new camp on navigation
    //creates infinite request loop though..
  }, []);

  const onHoverHandler = (e) => {
    setIsHovering(true);
  };
  const onHoverOutHandler = (e) => {
    setIsHovering(false);
  };

  let campContainerClasses = isHovering
    ? "campContainerHovered"
    : "campContainer";

  //Render list of campgrounds
  return (
    <Fragment>
      <h1 className={classes.header}>Campgrounds</h1>
      <main className={classes.campListMain}>
        <div className={classes.listContainer}>
          {isLoading && <p>Loading Campgrounds for you...</p>}
          {!isLoading &&
            // Create a campground component for each campground in the fetched array of data
            campData.campgrounds.map((campground, i) => (
              <div
                className={classes.campContainer}
                key={campground._id}
                onMouseOver={onHoverHandler}
                onMouseOut={onHoverOutHandler}
              >
                <Link className={classes.listLink} to={`${campground._id}`}>
                  <Campground
                    id={campground._id}
                    image={campground.images[0]}
                    title={campground.title}
                    location={campground.location}
                    price={campground.price}
                  />
                </Link>
              </div>
            ))}
        </div>

        <div className={classes.mapContainer}>
          {campData.campgrounds && (
            <ClusterMap data={campData} isHovering={isHovering} />
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default CampgroundList;
