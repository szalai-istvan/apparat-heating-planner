function mouseReleased() {
    
    if (mouseButton === LEFT) {
        leftMouseButtonPressedFunc()
    }
    stopDragging();
}

function leftMouseButtonPressedFunc() {
    if (calculateDistanceFromOrigin(getCurrentDragValue()) < SELECT_DRAG_THRESHOLD) {
        if (controlsAreEnabled) {
            searchSelectableObject();
        }
    }
}