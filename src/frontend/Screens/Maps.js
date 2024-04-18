import React, { useState } from "react";
import Geolocation from "react-native-geolocation-service";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA83zbSFogndgXQSf9w2SlsT9moRgGnC7E",
  });
  const position = {
    lat: -22.219769971209377,
    lng: -45.91594182571526,
  };

  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={{ lat: -22.219769971209377, lng: -45.91594182571526 }}
          zoom={17}
          options={{
            styles: [
              {
                elementType: "labels",
                featureType: "poi.attraction",
                featureType: "poi.business",
                featureType: "poi.government",
                featureType: "poi.park",
                featureType: "poi.place_of_worship",
                featureType: "poi.scholl",
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          <Marker
            position={position}
            options={{
              label: {
                text: "Você está aqui",
                className: "map-marker",
              },
            }}
          />

          <></>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Maps;
