/** @type {Number} */
let roomTextSize = undefined;
/** @type {Number} */
let roomLineWeight = undefined;
/** @type {Number} */
let panelLineWeight = undefined;
/** @type {Number} */
let panelTextSize = undefined;
/** @type {Number} */
let panelTextBoxWidth = undefined;
/** @type {Number} */
let panelTextBoxHeight = undefined;

/**
 * Újraszámolja a renderelési méret értékeket.
 * 
 * @returns {undefined}
 */
function updateRenderSizeValues() {
    const ratio = pixelsPerMetersRatio;

    roomTextSize = ratio ? ROOM_TEXT_SIZE_IN_METERS * ratio : undefined;
    roomLineWeight = ratio ? ROOM_LINE_WEIGHT_IN_METERS * ratio : undefined;
    panelLineWeight = ratio ? PANEL_CONTOUR_LINE_THICKNESS * ratio : undefined;
    panelTextSize = ratio ? PANEL_TEXT_SIZE_IN_METERS * ratio : undefined;

    push();
    textSize(panelTextSize);
    panelTextBoxWidth = ratio ? textWidth(F100) + 5 : undefined;
    panelTextBoxHeight = ratio ? panelTextSize + 5 : undefined;
    pop();
}