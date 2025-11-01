import { useState, useEffect, useContext } from "react";
import { getDistrictData } from "../services/api";
import { AppContext } from "../context/AppContext";

/**
 * Fetches all performance data for a given district.
 * @param {string} districtName - The name of the district to fetch.
 */
function useDistrictData(districtName) {
  const [data, setData] = useState(null);
  const { loading, setLoading, error, setError } = useContext(AppContext);

  useEffect(() => {
    // Don't fetch if no district name is provided
    if (!districtName) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // This API call is expected to return:
        // { latest: { ... }, history: [ ... ] }
        const result = await getDistrictData(districtName);
        setData(result);
      } catch (err) {
        console.error("Failed to fetch district data:", err);
        setError(`"${districtName}" के लिए डेटा नहीं मिला।`);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to clear error on unmount
    return () => setError(null);
  }, [districtName, setLoading, setError]); // Re-run if districtName changes

  return { data, loading, error };
}

export default useDistrictData;
