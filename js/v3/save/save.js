function getProjectState() {
  const rooms = roomContext.rooms
    .filter((room) => RoomManager.roomIsConfigured(room))
    .map(withSaveablePanels);

    let projectState = {
    blueprints: {
      data: blueprintContext.blueprints.map((bp) =>
        bp.data.canvas.toDataURL("image/png")
      ),
      topLeft: blueprintContext.blueprints.map((bp) => bp.topLeftPosition),
    },
    scale: {
      pixelsPerMeterRatio: scaleContext.pixelsPerMetersRatio,
    },
    rooms: {
      rooms: rooms,
    },
    screen: {
      sumDrag: screenContext.sumDrag,
      zoom: screenZoom,
    },
    grid: {
      seed: gridContext.seed
    },
  };
  projectState = JSON.stringify(projectState);
  roomContext.setupRoomsInPanels();
  return projectState;
}

function getProjectStateSize() {
  return (
    roundNumber(getProjectState().length / 1024 / 1024, 2) +
    " MB"
  );
}

function downloadProjectState() {
  const text = getProjectState();
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute(
    "download",
    `APPARAT_project_${Math.random().toString().substring(2)}.json`
  );

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function saveProject() {
  const stateStr = getProjectState();
  localStorage.setItem(LOCAL_STORAGE_DATA_KEY, stateStr);
}

function withSaveablePanels(room) {
  room.structureElementsInRoom.panels.forEach((p) => (p.room = null));
  return room;
}

if (SAVE_TO_LOCAL_STORAGE_ENABLED) {
  setInterval(saveProject, 10_000);
}
