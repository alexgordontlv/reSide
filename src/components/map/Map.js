import React, { useState, useRef, useCallback } from 'react';
import RoomIcon from '@material-ui/icons/Room';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import mapStyles from './mapStyles';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import './map.css';

const Search = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 32.07382, lng: () => 34.77989 },
      radius: 10000
    }
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          try {
            const geoResults = await getGeocode({ address });
            const { lat, lng } = await getLatLng(geoResults[0]);
            console.log(lat, lng);
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover className="option">
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

const Map = () => {
  const [selected, setSelected] = useState(null);
  console.log(selected);
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
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

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
      <Search />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {propertyArray.map((prop) => (
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
            <div>{selected.address}</div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
