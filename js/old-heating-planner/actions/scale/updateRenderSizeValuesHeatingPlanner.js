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
let ud30WidthPixel = undefined;
/** @type {Number} */
let beamTextSize = undefined;
/** @type {Number} */
let pixelsBetweenBeams = undefined;
/** @type {Number} */
let beamsMinimumOffset = undefined;

/**
 * Projekt specifikus renderelési méretek update-elése.
 * 
 * @returns {undefined}
 */
function updateRenderSizeValuesHeatingPlanner() {
    const ratio = pixelsPerMetersRatio;

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
    ud30WidthPixel = ratio ? UD30_WIDTH_METER * ratio : undefined;
    beamTextSize = ratio ? BEAM_TEXT_SIZE_METER * ratio : undefined;
    pixelsBetweenBeams = ratio ? METERS_BETWEEN_BEAMS * ratio : undefined;
    beamsMinimumOffset = ratio ? BEAM_MINIMUM_OFFSET_METERS * ratio : undefined;
}