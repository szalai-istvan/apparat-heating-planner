function mousePressed() {
  if (mouseButton === 'right') {
    if (scaleContext.scalingInProgress) {
      scaleContext.addReferencePoint();
    }
    roomContext.addPoint();
  } else if (mouseButton === 'left') {
    screenContext.startDragging();
    roomContext.checkForSelection();
  }
}
