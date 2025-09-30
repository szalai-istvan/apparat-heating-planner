function mouseReleased() {
    
    if (mouseButton === LEFT) {
        leftMouseButtonPressedFunc()
    }
    stopDragging();
}

function leftMouseButtonPressedFunc() {
    if (mouseCursorIsInsideUi()) {
        return;
    }

    if (calculateDistanceFromOrigin(getCurrentDragValue()) < SELECT_DRAG_THRESHOLD) {
        if (controlsAreEnabled) {
            searchSelectableObject();
        }
    }
}