/**
 * Megállapítja, hogy a panelcsoport iránya érvényes-e.
 * 
 * @param {Room} room 
 * @param {PanelGroup} panelGroup 
 * @returns {boolean} true, ha érvényes a panelcsoport iránya
 */
function panelGroupAlignmentIsValid(room, panelGroup) {
    const panelGroups = elementStore.panelGroups.filter(pg => pg.roomId === room.id);
    const alignments = panelGroups.map(pg => pg.alignment).map(alignment => alignment % 2);
    return [new Set(alignments)].length === 1;
}