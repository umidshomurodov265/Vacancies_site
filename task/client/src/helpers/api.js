import axios from "axios";

const AccessToken = JSON.parse(localStorage.getItem("AccessToken"));
const bodyParameters = {
  key: "value",
};
let config = {
  headers: { Authorization: `Bearer ${AccessToken}` },
};

const api = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },

  bodyParameters,
});

const API = axios.create({
  baseURL: "/api/v1/",
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },

  bodyParameters,
});

export default api;
API;
