function mouseWheel(event) {
    if (!screenContext.controlsAreEnabled()) {
        return;
    }
    
    if (event.delta > 0) {
        screenContext.zoomOut();
    } else {
        screenContext.zoomIn();
    }
}