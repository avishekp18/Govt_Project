import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

function useUserLocation() {
  const { loading, setLoading, error, setError } = useContext(AppContext);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        reject(new Error("Geolocation not supported."));
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(coords);
          resolve(coords);
        },
        (err) => {
          setLoading(false);
          // Handle common errors
          if (err.code === 1) {
            // PERMISSION_DENIED
            setError("आपने लोकेशन की अनुमति नहीं दी।");
          } else {
            setError("लोकेशन मिलने में समस्या हुई।");
          }
          reject(new Error(err.message));
        }
      );
    });
  };

  return { getLocation, location, error: !!error };
}

export default useUserLocation;
