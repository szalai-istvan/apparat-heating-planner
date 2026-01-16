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
        searchSelectableObject(); // TODO ellenőrizni hogy ez kell-e ide: Az egyik projektben nincs itt
    }
}

function rightMouseButtonPressedFunc() {
    addScalingReferencePoint();
    addPointToSelectedRoom();

    deselectObject();
}