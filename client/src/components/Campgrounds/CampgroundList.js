import React, { Fragment, useState, useEffect } from "react";
import Campground from "./Campground";
import classes from "./CampgroundList.module.css";

const CampgroundList = () => {
  const [campData, setCampData] = useState([{}]);
  useEffect(() => {
    async function fetchAPIData() {
      const res = await fetch("/campground");
      const data = await res.json();
      console.log(data);
      setCampData(data);
    }
    fetchAPIData();
    //use relative route since we defined the proxy to be port 5000 in package.json\
    //Setting campdata as a dependency allows us to see the new camp on navigation
    //creates infinite request loop though..
  }, []);
  return (
    <Fragment>
      <header>
        <h1>Campgrounds</h1>
      </header>
      <main>
        {typeof campData.campgrounds === "undefined" ? (
          <p>Loading...</p>
        ) : (
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
          ))
        )}
      </main>
    </Fragment>
  );
};

export default CampgroundList;
