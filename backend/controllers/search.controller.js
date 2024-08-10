import { User } from "../models/user.model.js";
import axios from "axios";
import axiosRetry from "axios-retry";

export async function searchPerson(req, res) {
  const { query } = req.params;

  const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
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

  if (data.results.length === 0) {
    return res.status(404).send(null);
  }
  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: data.results[0].id,
        image: data.results[0].profile_path,
        title: data.results[0].name,
        searchType: "person",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ success: true, content: data.results });
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };

  const response = await axios.get(url, options);
  console.log(response);
  const data = response.data;
  if (data.results.length === 0) {
    return res.status(404).send(null);
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: data.results[0].id,
        image: data.results[0].poster_path,
        title: data.results[0].title,
        searchType: "movie",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ success: true, content: data.results });
}

export async function searchTv(req, res) {
  const { query } = req.params;
  const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZmVjYzY0MGMyNjQyNDIxODllMjI4YTg1ODYzYmNjNSIsIm5iZiI6MTcyMTcxNDI5Ni43ODgwNDEsInN1YiI6IjY2OWY0NTg2ODc3ZmYyZmI4NjQ3Y2EwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M6vqlSnjwzbTfbdTqp8DB4jA8s4_aX94dwCO2L9BodM",
    },
  };

  const response = await axios.get(url, options);
  const data = response.data;
  if (data.results.length === 0) {
    return res.status(404).send(null);
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      searchHistory: {
        id: data.results[0].id,
        image: data.results[0].poster_path,
        title: data.results[0].title,
        searchType: "tv",
        createdAt: new Date(),
      },
    },
  });
  res.status(200).json({ success: true, content: data.results });
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  const { id } = req.params;
  const Id = parseInt(id);
  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      searchHistory: { id: Id },
    },
  });
  res
    .status(200)
    .json({ success: true, message: "Item removed from search history" });
}
