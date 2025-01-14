var canvas;

function setup() {
  const docSize = documentDimensions();
  canvas = createCanvas(docSize.vw * 0.9, window.innerHeight);
  canvas.parent("body");
  angleMode(DEGREES);
}

function draw() {
  background(255);
  dragContext.recalculateDragOffset();
  panelDragContext.recalculateDragOffset();

  blueprintImageData.draw();
  scalingContext.draw();
  panelInformation.drawPanels();
}

// Mouse events
function mousePressed() {
  if (scalingContext.scalingInProgress) {
    scalingContext.addReferencePoint();
  } else {
    dragContext.startDragging();
  }
}

function mouseReleased() {
  panelSelectionContext.selectPanel();
  dragContext.stopDragging();
}

function mouseWheel(event) {
  if (event.delta > 0) {
    displayContext.zoomOut();
  } else {
    displayContext.zoomIn();
  }
}