/**
 * Kiszámolja a paraméterül kapott doboz képernyőn megjelenítendő koordinátáit, megakadályozva, hogy a UI alá csússzon.
 * 
 * @param {Box} box doboz
 * @returns {Point} a megjelenítendő pozíció
 */
function calculateBoxCenterPositionWithCorrection(box) {
    checkClass(box, CLASS_BOX);

    const ratio = pixelsPerMetersRatio;
    const width = BOX_WIDTH_IN_METERS;
    const length = BOX_LENGTH_IN_METERS;

    let x_;
    let y_;

    const group = getBoxGroupById(box.groupId);
    if (group.alignment % 2 === 0) {
        x_ = width * ratio;
        y_ = length * ratio;
    } else {
        x_ = length * ratio;
        y_ = width * ratio;
    }

    const mousePosition = getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();
    const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (BOX_CORRECTION_OFFSET + x_ / 2) * screenZoom, mousePosition.x);
    const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (BOX_CORRECTION_OFFSET + y_ / 2) * screenZoom, mousePosition.y);

    const x = mousePositionAbsolute.x + (xCorrection || 0);
    const y = mousePositionAbsolute.y + (yCorrection || 0);
    return getClosestGridPoint(createPoint(x, y));
}