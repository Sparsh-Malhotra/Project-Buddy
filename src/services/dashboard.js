import axios from "axios";
import config from "../config";

export function submitDetails(body, authToken) {
  return axios
    .post(`${config.apiBaseUrl}/dashboard/submit-details`, body, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (error.response.data && error.response.data.message === "error")
        return error.response.data;
    });
}

export function updateDetails(body, id, authToken) {
  return axios
    .patch(`${config.apiBaseUrl}/dashboard/submit-details/${id}`, body, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      if (error.response.data && error.response.data.message === "error")
        return error.response.data;
    });
}

export function fetchDetails(authToken) {
  return axios
    .get(`${config.apiBaseUrl}/dashboard/get-details`, {
      headers: {
        "auth-token": authToken,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data && error.response.data.message === "error")
        return error.response.data;
    });
}

export function getAllBuddies(authToken,params) {
  return axios
    .get(`${config.apiBaseUrl}/dashboard/get-buddies`, {
      headers: {
        "auth-token": authToken,
      },
      params,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data && error.response.data.message === "error")
        return error.response.data;
    });
}

export function getBuddyById(authToken, id) {
  return axios
    .get(`${config.apiBaseUrl}/dashboard/${id}`, {
      headers: {
        "auth-token": authToken,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response.data && error.response.data.message === "error")
        return error.response.data;
    });
}
