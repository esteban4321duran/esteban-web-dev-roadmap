import * as config from "./config.js";

export const state = {
  selectedRoadmap: null,
  topics: [],
};

export const requestDataFromAPI = async function () {
  try {
    const requestURL = formatRequestURL(state.selectedRoadmap);

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
      throw new Error(`${dataResponse.message} (${response.state})`);
    // update state data
    state.topics = dataResponse.data.topics;
    return state.topics;
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
  return `${config.API}${resource}/`;
};

export const updateTopic = async (updatedTopic) => {
  try {
    const requestURL = formatRequestURL(state.selectedRoadmap);
    const fetchPromise = fetch(`${requestURL}${updatedTopic._id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedTopic),
      headers: {
        "Content-type": "application/json",

        Accept: "application/json",
      },
    });
    const response = await fetchPromise;
    const dataResponse = await response.json();

    if (!response.ok)
      throw new Error(`${dataResponse.message} (${response.state})`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
