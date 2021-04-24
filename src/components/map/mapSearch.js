import React, { useState } from 'react';
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
import FormProperty from '../formdialog/FormProperty';
const MapSearch = ({ panTo }) => {
  const [openNow, setopenNow] = useState(false);
  const [propsToPass, setPropsToPass] = useState('');

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
  const handleSubmit = ({ lat, lng }) => {
    setopenNow(true);
    clearSuggestions();
    panTo({ lat, lng });
  };
  return (
    <div className="search">
      <FormProperty
        openNow={openNow}
        setopenNow={setopenNow}
        propsToPass={propsToPass}
      />
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          try {
            const geoResults = await getGeocode({ address });
            const { lat, lng } = await getLatLng(geoResults[0]);
            setPropsToPass({ address, lat, lng });
            handleSubmit({ lat, lng });
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
          placeholder="Add new property by address"
        />
        <ComboboxPopover className="option">
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  key={id}
                  value={description}
                  className="search_option"
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default MapSearch;
