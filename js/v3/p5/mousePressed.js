function mousePressed() {
  if (!screenContext.controlsEnabled()) {
    return;
  }
  
  if (mouseButton === 'right') {
    if (scaleContext.scalingInProgress) {
      scaleContext.addReferencePoint();
    }
    roomContext.addPoint();
    selectionContext.tryToDeselect();
    
  } else if (mouseButton === 'left') {
    screenContext.startDragging();
    selectionContext.searchSelectableObject();
  }
}
