import React, { useState, useRef, useCallback } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import MapSearch from './mapSearch';
import './map.css';
import { useSelector, useDispatch } from 'react-redux';

const Map = () => {
  const [selected, setSelected] = useState(null);
  const properties = useSelector((state) => state.user.currentUser?.properties);
  const [libraries] = useState(['places']);

  const center = {
    lng: 34.77989,
    lat: 32.07382
  };

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
    height: '200px'
  };
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);
  console.log(center);
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
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {properties.map((prop) => (
            <Marker
              key={prop.id}
              position={{ lat: prop.lat, lng: prop.lng }}
              icon={{
                url: '/real-estate.svg',
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
              <div>{selected.name}</div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    )
  );
};

export default Map;
