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
        startDragging();
    }
}

function rightMouseButtonPressedFunc() {
    addScalingReferencePoint();
    addPointToSelectedRoom();

    deselectObject();
}