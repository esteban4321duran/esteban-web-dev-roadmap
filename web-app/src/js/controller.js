import * as model from "./model.js";
import RoadmapSelector from "../js/views/RoadmapSelector";
import RoadmapView from "../js/views/RoadmapView";

const init = function () {
  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: null,
  });

  roadmapSelector.subscribeClickListener(controlRoadmapSelectorClicks);
};

const controlRoadmapSelectorClicks = async function (event) {
  //selection strategy
  const clickedSelector = event.target.closest(".roadmap-selector");
  if (!clickedSelector) return;
  const clickedId = Number(clickedSelector.dataset.id);

  //update status
  model.status.selectedRoadmap = clickedId;

  //update roadmap selector view
  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: clickedId,
  });

  roadmapView.renderSpinner();

  //fetch data from API
  const topics = await model.requestDataFromAPI();
  console.log(topics);
};

//Starting point
const roadmapSelectorlabels = ["Front-end", "Back-end", "Devops"];
const roadmapSelector = new RoadmapSelector();
const roadmapContainer = document.querySelector(".roadmap-container");
const roadmapView = new RoadmapView(roadmapContainer);
init();
