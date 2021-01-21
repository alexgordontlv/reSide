import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomIcon from "@material-ui/icons/Room";

const Map = () => {
  const [viewport, setViewPort] = useState({
    latitude: 32.09016227876648,
    longitude: 34.80824571815939,
    zoom: 13,
    position: "absolute",
    overflow: "hidden",
    top: 0,
    bottom: 0,
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

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
  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="200px"
        scrollEnabled={true}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_BOX_API}
        onViewportChange={(viewport) => setViewPort(viewport)}
        mapStyle="mapbox://styles/alexgordontlv/ckk4kpj0y0qan17oc3ocgjap0"
      >
        {propertyArray.map((property) => (
          <Marker
            key={property.id}
            latitude={property.latitude}
            longitude={property.longitude}
          >
            <RoomIcon
              fontSize="large"
              onClick={(e) => {
                e.preventDefault();
                setSelectedProperty(property);
              }}
            />
          </Marker>
        ))}
        {selectedProperty && (
          <Popup
            latitude={selectedProperty.latitude}
            longitude={selectedProperty.longitude}
          >
            <div>{selectedProperty.address}</div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Map;
