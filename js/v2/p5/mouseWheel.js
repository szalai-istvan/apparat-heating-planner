function mouseWheel(event) {
    if (event.delta > 0) {
        screenContext.zoomOut();
    } else {
        screenContext.zoomIn();
    }
}