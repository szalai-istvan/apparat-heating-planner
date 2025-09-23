function mousePressed() {
    if (!controlsAreEnabled) {
        return;
    }

    if (mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === RIGHT) {
        rightMouseButtonPressedFunc();
    } else if (mouseButton === LEFT) {
        leftMouseButtonPressedFunc()
    }
}

function leftMouseButtonPressedFunc() {
    startDragging();
    searchSelectableObject();
}

function rightMouseButtonPressedFunc() {
    addScalingReferencePoint();
    addPointToSelectedRoom();

    deselectObject();
}