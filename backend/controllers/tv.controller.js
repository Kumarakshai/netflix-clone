import axios from "axios";
import axiosRetry from "axios-retry";

export async function getTrendingTv(req, res) {
  const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };
  axiosRetry(axios, { retries: 3 });

  const response = await axios.get(url, options);
  const data = response.data;
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }
  const randomTv =
    data.results[Math.floor(Math.random() * data.results?.length)];
  res.status(200).json({ success: true, content: randomTv });
}

export async function getTvTrailers(req, res) {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };
  axiosRetry(axios, { retries: 3 });
  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }
  const data = response.data;
  res.status(200).json({ success: true, trailers: data.results });
}

export async function getTvDetails(req, res) {
  const { id } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };
  axiosRetry(axios, { retries: 3 });

  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }
  const data = response.data;
  res.status(200).json({ success: true, content: data });
}

export async function getSimilarTvs(req, res) {
  const { id } = req.params;

  const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };
  axiosRetry(axios, { retries: 3 });

  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }
  const data = response.data;
  res.status(200).json({ success: true, similar: data });
}
export async function getTvByCategory(req, res) {
  const { category } = req.params;
  const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };
  axiosRetry(axios, { retries: 3 });
  const response = await axios.get(url, options);
  if (response.status !== 200) {
    throw new Error(`Failed to fetch data from TMDB` + response.statusText);
  }
  const data = response.data;
  res.status(200).json({ success: true, content: data.results });
}
