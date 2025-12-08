function mousePressed() {
    if (!controlsAreEnabled) {
        return;
    }

    if (mouseCursorIsInsideUi()) {
        return;
    }

    if (mouseButton === 'right') {
        rightMouseButtonPressedFunc();
    } else if (mouseButton === 'left') {
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
    addPointToSelectedPipeDriver();

    deselectObject();
}