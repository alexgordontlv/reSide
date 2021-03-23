import React, { useState, useRef, useCallback } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import MapSearch from './mapSearch';
import './map.css';
import { useSelector } from 'react-redux';
import Card from '../card/Card';
import vector from '../../icons/real-estate.svg';
const Map = () => {
  const [selected, setSelected] = useState(null);
  const properties = useSelector((state) => state.user.currentUser?.properties);
  const [libraries] = useState(['places']);
  console.log(properties);
  const center = useRef({
    lng: 34.77989,
    lat: 32.07382
  });

  const options = {
    styles: mapStyles,
    disableDefaultUI: true
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAP_API,
    libraries
  });

  const mapContainerStyle = {
    width: '100%',
    height: '250px'
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  if (loadError) return 'error loading map';
  if (!isLoaded) return 'Loading...';
  return (
    isLoaded && (
      <div>
        <MapSearch panTo={panTo} />
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center.current}
          options={options}
          onLoad={onMapLoad}
        >
          {properties.map((prop) => (
            <Marker
              key={prop.id}
              position={{ lat: prop.lat, lng: prop.lng }}
              icon={{
                url: vector,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15)
              }}
              onClick={() => {
                setSelected(prop);
              }}
            />
          ))}
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <Card {...selected} />
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    )
  );
};

export default Map;
