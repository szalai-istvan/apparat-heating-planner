/**
 * Úrjakalkulálja a panelcsoport összes tagjának pozícióját.
 * 
 * @param {PanelGroup} panelGroup 
 */
function updatePositionsOfAllMembers(panelGroup) {
    const panels = getPanelsByIdList(panelGroup.panelIds);

    let index = 0;
    const corrector = calculateCoordinateCorrector(panelGroup);
    while (index < panels.length) {
        const panel = panels[index];
        updatePanelPosition(panelGroup, panel, index, panelGroup.clickedMemberIndex, corrector);
        index++;
    }
}

/** @param {PanelGroup} panelGroup */
function calculateCoordinateCorrector(panelGroup) {
    if (!panelGroup.isSelectedForDrag) {
        return createPoint(0, 0);
    }

    const clickedMemberIndex = panelGroup.clickedMemberIndex || 0;
    const minimumAllowedX = LEFT_RIBBON_WIDTH + panelGroup.lengthInPixels / screenZoom;
    const minimumAllowedY = TOP_RIBBON_HEIGHT + (clickedMemberIndex + 0.5) * panelGroup.widthInPixels / screenZoom;

    const cursorOnScreen = getClosestGridPoint(getMousePosition());
    const minimumX = cursorOnScreen.x;
    const minimumY = cursorOnScreen.y;

    const differenceX = minimumX - minimumAllowedX;
    const differenceY = minimumY - minimumAllowedY;

    const deltaX = ((Math.abs(differenceX) - differenceX) / 2) / screenZoom;
    const deltaY = ((Math.abs(differenceY) - differenceY) / 2) / screenZoom;

    return createPoint(
        deltaX,
        deltaY
    );
}