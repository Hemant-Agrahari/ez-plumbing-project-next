import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function Map({ address }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      if (typeof window !== 'undefined' && window.google) {
        setGeocoder(new window.google.maps.Geocoder());
        setMap(new window.google.maps.Map(mapRef.current, {
          zoom: 8,
        }));
      }
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }, []);

  useEffect(() => {
    if (geocoder && map && address) {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          map.setCenter(location);
          new window.google.maps.Marker({
            map: map,
            position: location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  }, [address, geocoder, map]);

  return <div style={{ height: "400px" }} ref={mapRef} />;
}

export default Map;
