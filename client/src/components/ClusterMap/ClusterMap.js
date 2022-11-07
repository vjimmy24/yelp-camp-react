import { React, useState, useRef, useContext, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import CampContext from "../../Context/camp-context";
import { GiCampingTent } from "react-icons/gi";
import { IconContext } from "react-icons";

import classes from "./ClusterMap.module.css";

const ClusterMap = (props) => {
  const [campDetails, setCampDetails] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const campgrounds = props.data.campgrounds;
  console.log(campgrounds);
  const lat1 = campgrounds[0].geometry.coordinates[0];
  console.log(lat1);
  const long1 = campgrounds[0].geometry.coordinates[1];
  // console.log(array);

  // useEffect(() => {
  //   setIsLoading(true);

  //   const fetchCampData = (async) => {
  //     if (props.data.campgrounds) {
  //       // setCampDetails((prevState) => ({
  //       //   ...prevState,
  //       //   campDetails: props.data.campgrounds,
  //       // }));
  //       setCampDetails(props.data.campgrounds);
  //     }
  //     console.log(campDetails);
  //   };
  //   fetchCampData();
  // }, [props.data.campgrounds]);

  // useEffect(() => {
  //   // console.log(props.data.campgrounds);
  // }, [props.data.campgrounds]);

  // console.log(campgrounds);
  // const latitude = campgrounds[0].geometry.coordinates[0];
  // console.log(latitude);
  // const coords = campgrounds.map(
  //   (campground) => campground.geometry.coordinates
  // );
  // const geometry = coords.map((camp) =>
  //   camp.map((coordinate) => ({
  //     latitude: coordinate[0],
  //     longitude: coordinate[1],
  //   }))
  // );
  // console.log(geometry);
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -92.5795,
    width: "60vw",
    height: "100vh",
    zoom: 4,
  });

  const mapRef = useRef();

  return (
    <main>
      <ReactMapGL
        className={classes.map}
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidmppbW15MjQiLCJhIjoiY2w5d3p1Ymc1MDFmNDNwbG9vcjgyOTd0NiJ9.xqtFcrSkU_Hxa8atn_0l_Q"
        maxZoom={20}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        id={"clusterMap"}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        {props.data.campgrounds.map((camp) => (
          <Marker
            offsetTop={-20}
            offsetLeft={-7}
            latitude={camp.geometry.coordinates[1]}
            longitude={camp.geometry.coordinates[0]}
            // latitude={camp.geometry.coordinates[0]}
            // longitude={camp.geometry.coordinates[1]}
          >
            <IconContext.Provider value={{ color: "green", size: "1.2rem" }}>
              <GiCampingTent />
            </IconContext.Provider>
          </Marker>
        ))}
      </ReactMapGL>
    </main>
  );
};

export default ClusterMap;
