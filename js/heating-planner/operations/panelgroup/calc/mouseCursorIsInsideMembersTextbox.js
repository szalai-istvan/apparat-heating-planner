/**
 * Megállapítja, hogy a kurzor a paraméterül kapott fűtőelem csoport valamely tagjának szövegdobozában található-e.
 * 
 * @param {PanelGroup} panelGroup, fűtőelem csoport 
 * @returns {boolean} true, ha valamely tag szövegdobozában található a kurzor
 */
function mouseCursorIsInsideMembersTextbox(panelGroup) { // Project-specific
    if (panelGroup.cursorIsInsideCache === null) {
        const panels = getPanelsByIdList(panelGroup.panelIds);
        const selectable = panels.filter(p => mouseCursorIsInsidePanelsTextbox(p));
        panelGroup.cursorIsInsideCache = selectable.length > 0;
    }

    return panelGroup.cursorIsInsideCache;
}