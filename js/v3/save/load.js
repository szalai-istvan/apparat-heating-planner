var jsonInput = document.getElementById("jsonInput");

function loadProjectState() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_DATA_KEY));
}

function loadProject(text = undefined) {
  const projectState = text ? JSON.parse(text) : loadProjectState();
  if (!projectState) {
    return;
  }

  blueprintContext.clearBlueprints();
  (projectState.blueprints.data || []).forEach((bp) => blueprintContext.createBlueprint(loadImage(bp)));

  const topLeftCoordinates = projectState.blueprints.topLeft;
  for (let i = 0; i < topLeftCoordinates.length; i++) {
    blueprintContext.blueprints[i].topLeftPosition = topLeftCoordinates[i];
  }

  scaleContext.pixelsPerMetersRatio = projectState.scale.pixelsPerMeterRatio;
  if (scaleContext.pixelsPerMetersRatio) {
    setTimeout(() => tooltip.scalingFinished(), 3_000);
  }

  const rooms = projectState.rooms.rooms;
  roomContext.rooms = rooms;
  rooms.forEach((room) => (room.constructor = { name: "Room" }));
  rooms.forEach((room) => renderer.register(room));
  if (roomContext.rooms.length) {
    setTimeout(() => tooltip.roomAddingFinished(), 3_000);
  }

  const seir = rooms.map((r) => r.structureElementsInRoom);
  seir.forEach((s) => (s.constructor = { name: "StructureElementsInRoom" }));
  seir.forEach((s) => renderer.register(s));

  let panels = setupAndGetPanels(projectState);

  panelContext.panels = panels;
  panels.forEach((panel) => (panel.constructor = { name: "Panel" }));
  panels.forEach((panel) => renderer.register(panel));
  if (panelContext.panels.length) {
    setTimeout(() => tooltip.panelAdded(), 3_000);
  }

  seir.forEach((s) => StructureElementManager.recalculateBeams(s));
  seir.forEach((s) => StructureElementManager.setAlignment(s, s.alignment));
  selectionContext.lastSelectingContext = panelContext;

  screenContext.sumDrag = projectState.screen.sumDrag;
  screenContext.zoom = projectState.screen.zoom;
}

function setupAndGetPanels(projectState) {
  const panels = [];
  const rooms = projectState.rooms.rooms;
  for (let room of rooms) {
    const seir = room.structureElementsInRoom;
    for (let panel of seir.panels) {
      panel.room = room;
      panels.push(panel);
    }
  }
  return panels;
}

function uploadProject() {
  jsonInput.click();
}

function handleJsonSelect(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = function (event) {
    const result = event.target.result;
    if (result) {
      loadProject(result);
    }
    imageInput.value = "";
  };
  reader.readAsText(file);
}
jsonInput.addEventListener("change", handleJsonSelect);
