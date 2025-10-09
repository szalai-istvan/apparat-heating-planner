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
/** @type {Number} */
let beamLineWidthPixel = undefined;
/** @type {Number} */
let beamWidthPixel = undefined;
/** @type {Number} */
let beamTextSize = undefined;
/** @type {Number} */
let pixelsBetweenBeams = undefined;
/** @type {Number} */
let beamsMinimumOffset = undefined;
/** @type {Number} */
let roomNameOutlineWidth = undefined;

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

    if (panelTextSize) {
        push();

        textSize(panelTextSize);
        panelTextBoxWidth = ratio ? textWidth(F100) + 5 : undefined;
        panelTextBoxHeight = ratio ? panelTextSize + 5 : undefined;

        pop();
    }

    beamLineWidthPixel = ratio ? ROOM_LINE_WEIGHT_IN_METERS * ratio : undefined;
    beamWidthPixel = ratio ? BEAM_WIDTH_METER * ratio : undefined;
    beamTextSize = ratio ? BEAM_TEXT_SIZE_METER * ratio : undefined;
    pixelsBetweenBeams = ratio ? METERS_BETWEEN_BEAMS * ratio : undefined;
    beamsMinimumOffset = ratio ? BEAM_MINIMUM_OFFSET_METERS * ratio : undefined;
    roomNameOutlineWidth = ratio ? ROOM_NAME_OUTLINE_WIDTH * ratio : undefined;
}