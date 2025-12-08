function mouseWheel(event) {
    if (!controlsAreEnabled) {
        return;
    }
    
    if (event.delta > 0) {
        zoomOut();
    } else {
        zoomIn();
    }
}