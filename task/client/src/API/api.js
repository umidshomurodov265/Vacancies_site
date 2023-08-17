import axios from "axios";

const AccessToken = JSON.parse(localStorage.getItem("AccessToken"));
const bodyParameters = {
  key: "value",
};
let config = {
  headers: { Authorization: `Bearer ${AccessToken}` },
};

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    Authorization: `Bearer ${AccessToken}`,
  },

  bodyParameters,
});

export default API;
