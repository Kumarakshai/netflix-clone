import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };

  const response = await axios.get(url, options);
  console.log(response);

  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }

  return response.data;
  // } catch (error) {
  //   console.error("Error:", error);
  // }
};
