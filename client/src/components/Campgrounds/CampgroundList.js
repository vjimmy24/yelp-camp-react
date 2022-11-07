import React, { Fragment, useState, useEffect } from "react";
import Campground from "./Campground";
import classes from "./CampgroundList.module.css";
import CampContext from "../../Context/camp-context";
import ClusterMap from "../ClusterMap/ClusterMap";

const CampgroundList = () => {
  const [campData, setCampData] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <Fragment>
      <header>
        <h1 className={classes.header}>Campgrounds</h1>
      </header>
      <main>
        <div className={classes.listContainer}>
          {isLoading && <p>Loading Campgrounds for you...</p>}{" "}
          {!isLoading &&
            campData.campgrounds.map((campground, i) => (
              <div className={classes.campContainer} key={campground._id}>
                <Campground
                  id={campground._id}
                  image={campground.images[0]}
                  title={campground.title}
                  location={campground.location}
                  price={campground.price}
                />
              </div>
            ))}
        </div>

        <div className={classes.mapContainer}>
          {campData.campgrounds && <ClusterMap data={campData} />}
        </div>
      </main>
    </Fragment>
  );
};

export default CampgroundList;
