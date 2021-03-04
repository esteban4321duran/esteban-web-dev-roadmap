import RoadmapSelector from "../js/views/RoadmapSelector";
import RoadmapView from "../js/views/RoadmapView";

const init = function () {
  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: null,
  });

  roadmapSelector.subscribeClickListener(controlRoadmapSelectorClicks);
};

const controlRoadmapSelectorClicks = function (event) {
  const clickedSelector = event.target.closest(".roadmap-selector");
  if (!clickedSelector) return;
  const clickedId = Number(clickedSelector.dataset.id);

  roadmapSelector.updateAndRender({
    labels: roadmapSelectorlabels,
    selectedId: clickedId,
  });
};

//Starting point
const roadmapSelectorlabels = ["Front-end", "Back-end", "Devops"];
const roadmapSelector = new RoadmapSelector();
init();
