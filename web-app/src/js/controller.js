import * as model from "./model.js";
import RoadmapSelector from "../js/views/RoadmapSelector";
import RoadmapView from "../js/views/RoadmapView";

const init = function () {
  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: null,
  });

  //subscribe event listener
  roadmapSelector.subscribeClickListener(controlRoadmapSelectorClicks);
  roadmapView.subscribeClickListener(controlSubtopicClicks);
  roadmapView.subscribeClickListener(controlTopicClicks);
};

const controlRoadmapSelectorClicks = async function (event) {
  //selection strategy
  const clickedSelector = event.target.closest(".roadmap-selector");
  if (!clickedSelector) return;
  const clickedId = Number(clickedSelector.dataset.id);

  //update status
  model.state.selectedRoadmap = clickedId;

  //update roadmap selector view
  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: clickedId,
  });

  roadmapView.renderSpinner();

  //fetch data from API
  const topics = await model.requestDataFromAPI();

  //update and render to the view
  roadmapView.updateAndRender(topics);
};

const controlSubtopicClicks = async function (event) {
  const clickedElement = event.target;
  if (!clickedElement.classList.contains("subtopic")) return;
  //update state
  toggleSubtopicStatus(clickedElement);
  toggleTopicStatus(clickedElement);
  const updatedTopic = findTopic(clickedElement);
  model.updateTopic(updatedTopic);
  //update UI
  roadmapView.updateAndRender(model.state.topics);
};

const toggleSubtopicStatus = (clickedElement) => {
  const subtopic = findSubtopic(clickedElement);
  if (subtopic.status === "pending") subtopic.status = "done";
  else subtopic.status = "pending";
};
const findSubtopic = (clickedElement) => {
  const clickedElementParent = clickedElement.closest(".topic-container");
  const topicElementTitle = clickedElementParent.querySelector(".topic-title");

  const topicIndex = model.state.topics.findIndex((topic) => {
    return topic.name === topicElementTitle.textContent;
  });

  const topic = model.state.topics[topicIndex];
  return topic.subtopics.find((subtopic) => {
    return subtopic.content === clickedElement.textContent;
  });
};
const toggleTopicStatus = (clickedElement) => {
  const topic = findTopic(clickedElement);
  if (
    topic.subtopics.every((subtopic) => {
      return subtopic.status === "done";
    })
  ) {
    if (topic.status === "pending") topic.status = "done";
  } else topic.status = "pending";
};
const findTopic = (clickedElement) => {
  const clickedElementParent = clickedElement.closest(".topic-container");
  const topicTitle = clickedElementParent.querySelector(".topic-title")
    .textContent;
  return model.state.topics.find((topic) => {
    return topic.name === topicTitle;
  });
};

const controlTopicClicks = (event) => {
  const clickedElement = event.target;
  if (!clickedElement.classList.contains("topic-title")) return;
  //update state
  toggleAllSubtopicsStatus(clickedElement);
  const updatedTopic = findTopic(clickedElement);
  model.updateTopic(updatedTopic);
  //update view
  roadmapView.updateAndRender(model.state.topics);
};
const toggleAllSubtopicsStatus = (clickedElement) => {
  const topic = findTopic(clickedElement);
  console.log("ran");
  if (topic.status === "pending") {
    topic.status = "done";
    topic.subtopics.forEach((subtopic) => (subtopic.status = "done"));
  } else {
    topic.status = "pending";
    topic.subtopics.forEach((subtopic) => (subtopic.status = "pending"));
  }
};

//Starting point
const roadmapSelectorlabels = ["Front-end", "Back-end", "Devops"];
const roadmapSelector = new RoadmapSelector();
const roadmapContainer = document.querySelector(".roadmap-container");
const roadmapView = new RoadmapView(roadmapContainer);
init();
