function mouseReleased() {
    
    if (mouseButton === LEFT) {
        leftMouseButtonReleasedFunc()
    }
    stopDragging();
}

function leftMouseButtonReleasedFunc() {
    if (mouseCursorIsInsideUi()) {
        return;
    }

    if (calculateDistanceFromOrigin(getCurrentDragValue()) < SELECT_DRAG_THRESHOLD) {
        if (controlsAreEnabled) {
            searchSelectableObject();
        }
    }
}