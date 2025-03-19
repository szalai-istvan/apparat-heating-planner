function mousePressed() {
  if (!screenContext.controlsEnabled()) {
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
    selectionContext.searchSelectableObject();
  }
}
