
import { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function LocationInput({sendData, placeholder}) {
  const [address, setAddress] = useState("");
  const handleChangeAddress = (newAddress) => {
    setAddress(newAddress);
  };
  const handleSelectAddress = (newAddress) => {
    setAddress(newAddress);

    sendData(newAddress)
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChangeAddress}
      onSelect={handleSelectAddress}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: placeholder,
              className:
                "location-search-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
export const Autocomplet = ({sendData, placeholder}) => {
    const getData = (data) => {
        sendData(data)
    }
  return (
    <div><LocationInput sendData={getData} placeholder={placeholder} /></div>
  )
}
