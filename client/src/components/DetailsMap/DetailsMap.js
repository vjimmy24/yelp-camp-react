import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IconContext } from "react-icons";

import classes from "./DetailsMap.module.css";

const DetailsMap = (props) => {
  // console.log(props);
  const [data, setData] = useState([{}]);
  const [viewport, setViewport] = useState({});
  const [markerSelected, setMarkerSelected] = useState(true);
  // useEffect(() => {
  //   // setData(props.data.geometry.coordinates[0]);
  //   setData(props.data);
  //   setViewport({
  //     longitude: data.geometry.coordinates[0],
  //     latitude: data.geometry.coordinates[1],
  //     // latitude: 39.8283,
  //     // longitude: -92.5795,
  //     width: "50vw",
  //     height: "65vh",
  //     zoom: 8,
  //   });
  // }, [props.data]);
  // console.log(data);
  useEffect(() => {
    if (props.data.geometry) {
      setViewport({
        longitude: props.data.geometry.coordinates[0],
        latitude: props.data.geometry.coordinates[1],
        // latitude: 39.8283,
        // longitude: -92.5795,
        width: "50vw",
        height: "65vh",
        zoom: 8,
        maxZoom: 8,
        minZoom: 8,
      });
    }
  }, [props.data, viewport.latitude, viewport.longitude]);
  const { latitude, longitude } = viewport;

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoidmppbW15MjQiLCJhIjoiY2w5d3p1Ymc1MDFmNDNwbG9vcjgyOTd0NiJ9.xqtFcrSkU_Hxa8atn_0l_Q"
      maxZoom={20}
      {...viewport}
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      <Marker
        offsetTop={-20}
        offsetLeft={-7}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
      >
        <div
          className={classes.detailsPopUp}
          onClick={(e) => {
            setMarkerSelected(!markerSelected);
          }}
        >
          <IconContext.Provider value={{ color: "orange", size: "2.5rem" }}>
            <FaMapMarkerAlt />
          </IconContext.Provider>
        </div>
      </Marker>

      {markerSelected && (
        <Popup
          offsetLeft={15}
          offsetTop={-20}
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
          onClose={() => {
            setMarkerSelected(null);
          }}
        >
          <div>
            <h3>{props.data.title}</h3>
            <p>{props.data.location}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default DetailsMap;
