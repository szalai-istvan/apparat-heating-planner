/** @type {Number} */
let roomTextSize = undefined;
/** @type {Number} */
let roomLineWeight = undefined;
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
    roomNameOutlineWidth = ratio ? ROOM_NAME_OUTLINE_WIDTH * ratio : undefined;

    dispatchCustomEvent(UPDATE_RENDER_SIZE_VALUE, {});
}