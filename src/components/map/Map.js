import React, { useState } from "react";
import RoomIcon from "@material-ui/icons/Room";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";

const Map = () => {
  const center = {
    lng: 34.80824571815939,
    lat: 32.09016227876648,
  };
  const options = {
    styles: mapStyles,
  };
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries,
  });
  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };
  const propertyArray = [
    {
      id: 1,
      address: "Pinkas 35",
      latitude: 32.0911075933129,
      longitude: 34.78463155009423,
    },
    {
      id: 2,
      address: "Shlomo hamelech",
      latitude: 32.08995321739308,
      longitude: 34.77786165454013,
    },
    {
      id: 3,
      address: "Habima",
      latitude: 32.07339040757201,
      longitude: 34.77947097994985,
    },
  ];

  if (loadError) return "error loading map";
  if (!isLoaded) return "Loading...";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      ></GoogleMap>
    </div>
  );
};

export default Map;
