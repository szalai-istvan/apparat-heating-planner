function mousePressed() {
    if (!controlsAreEnabled || mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === LEFT) {
        leftMouseButtonPressedFunc();
    } else if (mouseButton === RIGHT) {
        rightMouseButtonPressedFunc();
    }
}

function rightMouseButtonPressedFunc() {
    addScalingReferencePoint();
    addPointToSelectedRoom();

    deselectObject();
}

function leftMouseButtonPressedFunc() {
    startDragging();
}