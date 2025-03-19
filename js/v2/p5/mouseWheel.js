function mouseWheel(event) {
    if (!screenContext.controlsEnabled()) {
        return;
    }
    
    if (event.delta > 0) {
        screenContext.zoomOut();
    } else {
        screenContext.zoomIn();
    }
}