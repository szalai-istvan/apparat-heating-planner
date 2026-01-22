function mouseReleased() {
    if (!controlsAreEnabled || mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === LEFT) {
        leftMouseButtonReleasedFunc();
    } else if (mouseButton === RIGHT) {
        rightMouseButtonReleasedFunc();
    }

    stopDragging();
}

function leftMouseButtonReleasedFunc() {
    if (calculateDistanceFromOrigin(getCurrentDragValue()) < SELECT_DRAG_THRESHOLD) {
        if (controlsAreEnabled) {
            searchSelectableObject();
        }
    }
}

function rightMouseButtonReleasedFunc() {
    dispatchCustomEvent(RIGHT_MOUSE_BUTTON_RELEASED, {});
}