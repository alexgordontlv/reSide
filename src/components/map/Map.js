import React, { useState } from "react";
import RoomIcon from "@material-ui/icons/Room";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = () => {
  const [viewport, setViewPort] = useState({
    lng: 32.09016227876648,
    lat: 34.80824571815939,
    zoom: 10,
  });
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_CALENDAR_API_KEY,
    libraries,
  });

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
  return <div></div>;
};

export default Map;
