import React, { useState, useEffect } from "react";
import Geolocation from "react-native-geolocation-service";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import NavBar from "../../../components/Navbar";
import "./index.css";

function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA83zbSFogndgXQSf9w2SlsT9moRgGnC7E",
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div className="map">
      <NavBar />
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={currentLocation}
          zoom={14.5}
          options={{
            styles: [
              {
                elementType: "labels",
                featureType: "poi",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.attraction",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.government",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.place_of_worship",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.school",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.sports_complex",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi.medical",
                stylers: [{ visibility: "on" }],
              },
            ],
          }}
        >
          
        </GoogleMap>
      ) : (
        <div>Carregando mapa...</div>
      )}
    </div>
  );
}

export default Maps;
