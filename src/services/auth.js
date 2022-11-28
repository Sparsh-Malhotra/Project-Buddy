import axios from "axios";
import config from "../config";

export function registerUser(name, email, password) {
  const body = {
    name,
    email,
    password,
  };

  return axios
    .post(`${config.apiBaseUrl}/user/register`, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
