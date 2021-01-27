import React, { useState } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import mapStyles from './mapStyles';

const Map = () => {
  const center = {
    lng: 34.77989,
    lat: 32.07382
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true
  };
  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries
  });
  const mapContainerStyle = {
    width: '100%',
    height: '200px'
  };
  const propertyArray = [
    {
      id: 1,
      address: 'Pinkas 35',
      lng: 34.7759,
      lat: 32.07162
    },
    {
      id: 2,
      address: 'Shlomo hamelech',
      lat: 32.08995321739308,
      lng: 34.77786165454013
    },
    {
      id: 3,
      address: 'Habima',
      lat: 32.07382,
      lng: 34.77989
    }
  ];

  if (loadError) return 'error loading map';
  if (!isLoaded) return 'Loading...';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
      >
        {propertyArray.map((prop) => (
          <Marker key={prop.id} position={{ lat: prop.lat, lng: prop.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
