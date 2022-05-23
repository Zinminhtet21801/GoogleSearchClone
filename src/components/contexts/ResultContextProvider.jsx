import React, { createContext, useContext, useState } from "react";
import axios from "axios";
const ResultContext = createContext();

const baseUrl = `https://google-search3.p.rapidapi.com/api/v1`;

const videoBaseUrl = `https://${process.env.REACT_APP_HOST}/api/v1/video/`;
const videoHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_HOST,
  "x-rapidapi-key": process.env.REACT_APP_KEY,
};

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Google");

  const getResults = async (type) => {
    setIsLoading(true);
    console.log(type);
    const response = type.includes("videos")
      ? await axios({
          method: "GET",
          url: videoBaseUrl + `q=${searchTerm}`,
          headers: videoHeaders,
        })
      : await axios({
          method: "GET",
          url: `${baseUrl}${type.includes("/images") ? `/image/q=${searchTerm}` : type}`,
          headers: {
            "x-user-agent": "desktop",
            "x-proxy-location": "US",
            "x-rapidapi-host": process.env.REACT_APP_HOST,
            "x-rapidapi-key": process.env.REACT_APP_KEY,
          },
        });
    console.log(response.data);
    if (type.includes("/news")) {
      setResults(response.data.entries);
    } else if (type.includes("/images")) {
      setResults(response.data.image_results);
    } else if (type.includes("videos")) {
      setResults(response.data.results);
    } else {
      setResults(response.data.results);
    }
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
