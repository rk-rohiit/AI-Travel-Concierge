import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
});

export const getTravelPlan = async (
  city,
  arrival_date,
  departure_date
) => {
  const response = await API.get("/travel/plan", {
    params: {
      city,
      arrival_date,
      departure_date,
    },
  });

  return response.data;
};