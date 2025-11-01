import axios from "axios";

// 1. Get the URL from Vite's import.meta.env object
//    (This is line 7, where your error was)
const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create an Axios instance pointing to your backend
const apiClient = axios.create({
  baseURL: apiURL, // 2. Use the correct variable here
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetches the list of districts for a given state.
 * @param {string} stateName (e.g., "uttar-pradesh")
 * @returns {Promise<Array>} A list of district names
 */
export const getStateDistricts = async (stateName = "uttar-pradesh") => {
  // Use the new apiClient
  const response = await apiClient.get(`/state/${stateName}/districts`);
  return response.data;
};

/**
 * Fetches the performance data for one district.
 * @param {string} districtName (e.g., "Lucknow")
 * @returns {Promise<Object>} Object with { latest: {...}, history: [...] }
 */
export const getDistrictData = async (districtName) => {
  const response = await apiClient.get(`/districts/${districtName}`);
  return response.data;
};

/**
 * Sends lat/lon to the backend to get a district name.
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<Object>} e.g., { districtName: "Lucknow" }
 */
export const getDistrictFromCoords = async (latitude, longitude) => {
  const response = await apiClient.post("/location/check-district", {
    latitude,
    longitude,
  });
  return response.data;
};
