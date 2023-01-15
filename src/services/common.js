import axios from "axios";

export function getStates() {
  const config = {
    method: "get",
    url: "https://api.countrystatecity.in/v1/countries/IN/states",
    headers: {
      "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_STATES_KEY,
    },
  };

  return axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
