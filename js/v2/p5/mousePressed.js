function mousePressed() {
  if (!screenContext.controlsAreEnabled()) {
    return;
  }
  
  if (mouseButton === 'right') {
    if (scaleContext.scalingInProgress) {
      scaleContext.addReferencePoint();
    }
    roomContext.addPoint();
    selectionContext.deselect();
    
  } else if (mouseButton === 'left') {
    screenContext.startDragging();
    selectionContext.select();
  }
}
