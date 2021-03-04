import * as config from "./config.js";

export const status = {
  selectedRoadmap: null,
  topics: [],
};

export const requestDataFromAPI = async function () {
  try {
    const requestURL = formatRequestURL(status.selectedRoadmap);

    const fetchPromise = fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const response = await fetchPromise;

    const dataResponse = await response.json();

    if (!response.ok)
      throw new Error(`${dataResponse.message} (${response.status})`);
    // update status data
    status.topics = dataResponse.data.topics;
    return status.topics;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const formatRequestURL = (selectedRoadmap) => {
  let resource = "";
  if (selectedRoadmap === 0) resource = "front-end";
  if (selectedRoadmap === 1) resource = "back-end";
  if (selectedRoadmap === 2) resource = "devops";
  return `${config.API}${resource}`;
};
