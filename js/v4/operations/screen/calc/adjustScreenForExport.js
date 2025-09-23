/**
 * Beállítja a képernyő húzás és zoom értékeit az Excel exporthoz optimális értékekre
 * 
 * @returns {undefined}
 */
function adjustScreenForExport() {
    const blueprintSize = blueprintContext.getSizeData();
    const docSize = getDocumentDimensions();

    const x = blueprintSize.x;
    const y = blueprintSize.y;
    const sumDrag = { x: -x - docSize.vw / 2 + 100, y: -y - docSize.vh / 2 + TOP_RIBBON_HEIGHT };
    this.sumDrag = sumDrag;
    screenZoom = 1;
}