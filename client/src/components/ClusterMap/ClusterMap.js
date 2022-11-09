import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import useSupercluster from "use-supercluster";
import CampContext from "../../Context/camp-context";
import { GiCampingTent } from "react-icons/gi";
import { IconContext } from "react-icons";

import classes from "./ClusterMap.module.css";

const ClusterMap = (props) => {
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -92.5795,
    width: "60vw",
    height: "80vh",
    zoom: 3.5,
  });
  const mapRef = useRef();
  const [selectedCamp, setSelectedCamp] = useState(null);

  //Remove Popup on esc key
  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") {
        setSelectedCamp(null);
      }
      window.addEventListener("keydown", escListener);
    };

    //Clean up effect if unmounted

    return () => {
      window.removeEventListener("keydown", escListener);
    };
  }, []);

  //Create points from campgrounds props
  const points = props.data.campgrounds.map((camp) => ({
    type: "Feature",
    properties: {
      cluster: false,
      id: camp._id,
      category: "camp",
      name: camp.title,
      location: camp.location,
      image: camp.images[0].url,
      description: camp.description,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(camp.geometry.coordinates[0]),
        parseFloat(camp.geometry.coordinates[1]),
      ],
    },
  }));
  // console.log(points);

  //Get map bounds
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  //Get clusters from useSupercluster hook
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 50, maxZoom: 14 },
  });

  // console.log(clusters);

  //Render Mapbox Cluster Map
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
        mapStyle="mapbox://styles/mapbox/light-v10"
        ref={mapRef}
      >
        {/* A cluster can either be a clustered group of points, or as you zoom in, a cluster will return a point. */}
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;

          // If we have a cluster, render the clusters with the amount of campgrounds within each cluster

          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                {/*Set on click property to zoom in on cluster */}
                <div
                  className={classes.cluster_marker}
                  onClick={() => {
                    //Set the maximum zoom on-click to be the maximum zoom defined on the viewport (14)
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      14
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      //New Zoom Level
                      zoom: expansionZoom,
                      //Set zoom transition
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          // If we don't have a cluster, i.e. singular points from zooming in or there not being any grouped campgrounds
          // Render the individual campground markers.

          return (
            <Marker
              key={cluster.properties.id}
              offsetTop={-20}
              offsetLeft={-7}
              latitude={latitude}
              longitude={longitude}
              className={classes.camp_marker}
            >
              <div
                className={classes.camp_marker}
                onClick={(e) => {
                  setSelectedCamp(cluster);
                }}
              >
                <IconContext.Provider
                  value={{ color: "orange", size: "1.5rem" }}
                >
                  <GiCampingTent />
                </IconContext.Provider>
              </div>
            </Marker>
          );
        })}

        {selectedCamp && (
          <Popup
            latitude={selectedCamp.geometry.coordinates[1]}
            longitude={selectedCamp.geometry.coordinates[0]}
            onClose={() => {
              setSelectedCamp(null);
            }}
          >
            <div className={classes.campPopup}>
              <h3>{selectedCamp.properties.name}</h3>
              <p>{selectedCamp.properties.location}</p>
              <img src={selectedCamp.properties.image} alt="" />
              <p className={classes.PopupTextDescription}>
                {selectedCamp.properties.description}{" "}
                <Link to={`${selectedCamp.properties.id}`}>More</Link>
              </p>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </main>
  );
};

export default ClusterMap;
