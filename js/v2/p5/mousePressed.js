function mousePressed() {
  if (mouseButton === 'right') {
    if (scaleContext.scalingInProgress) {
      scaleContext.addReferencePoint();
    }
  } else if (mouseButton === 'left') {
    screenContext.startDragging();
  }
}
