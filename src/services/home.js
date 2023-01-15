import axios from "axios";
import config from "../config";

export function getConsole() {
  return axios
    .get(`${config.apiBaseUrl}/console/home`, {
      headers: {
        "Content-Type": "application/json",
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
