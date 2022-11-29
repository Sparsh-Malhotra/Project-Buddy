import axios from "axios";
import config from "../config";

export function registerUser(name, email, password) {
  const body = {
    name,
    email,
    password,
  };

  return axios
    .post(`${config.apiBaseUrl}/user/register`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function loginUser(email, password) {
  const body = {
    email,
    password,
  };

  return axios
    .post(`${config.apiBaseUrl}/user/login`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
