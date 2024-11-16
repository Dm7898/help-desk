import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "https://help-desk-tqbw.onrender.com", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});
