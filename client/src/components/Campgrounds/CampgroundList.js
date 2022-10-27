import React, { Fragment, useState, useEffect } from "react";
import Campground from "./Campground";

const CampgroundList = () => {
  const [campData, setCampData] = useState([{}]);
  useEffect(() => {
    async function fetchAPIData() {
      const res = await fetch("/campground");
      const data = await res.json();
      setCampData(data);
    }
    fetchAPIData();
    //use relative route since we defined the proxy to be port 5000 in package.json
  }, []);
  return (
    <Fragment>
      {typeof campData.campgrounds === "undefined" ? (
        <p>Loading...</p>
      ) : (
        campData.campgrounds.map((campground, i) => (
          <div key={campground._id}>
            <Campground
              id={campground._id}
              title={campground.title}
              location={campground.location}
              price={campground.price}
            />
          </div>
        ))
      )}
    </Fragment>
  );
};

export default CampgroundList;
