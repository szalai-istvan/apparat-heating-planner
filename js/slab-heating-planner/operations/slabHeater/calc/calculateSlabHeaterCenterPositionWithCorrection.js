/**
 * Kiszámolja a paraméterül kapott födémfűtő elem képernyőn megjelenítendő koordinátáit, megakadályozva, hogy a UI alá csússzon az elem
 * 
 * @param {SlabHeater} slabHeater födémfűtő
 * @param {Number} width elem szélessége
 * @param {Number} length elem hosszúsága
 * @returns {Point} a megjelenítendő pozíció
 */
function calculateSlabHeaterCenterPositionWithCorrection(slabHeater, width, length) {
    checkClass(slabHeater, CLASS_SLAB_HEATER);

    const ratio = pixelsPerMetersRatio;
    const group = getSlabHeaterGroupById(slabHeater.groupId);
    const selectedIndex = group.clickedMemberIndex || 0;
    let x_;
    let y_;

    if (group.alignment % 2 === 1) {
        x_ = (selectedIndex + 0.5) * width * ratio;
        y_ = (length + TUBE_DISTANCE_IN_METER) * ratio / 2;
    } else {
        x_ = (length + TUBE_DISTANCE_IN_METER) * ratio / 2;
        y_ = (selectedIndex + 0.5) * width * ratio;
    }

    const mousePosition = getMousePosition();
    const mousePositionAbsolute = getMousePositionAbsolute();
    const xCorrection = calculateCorrector(LEFT_RIBBON_WIDTH + (SLAB_HEATER_CORRECTION_OFFSET + x_) * screenZoom, mousePosition.x);
    const yCorrection = calculateCorrector(TOP_RIBBON_HEIGHT + (SLAB_HEATER_CORRECTION_OFFSET + y_) * screenZoom, mousePosition.y);

    const x = mousePositionAbsolute.x + (xCorrection || 0);
    const y = mousePositionAbsolute.y + (yCorrection || 0);
    return getClosestGridPoint(createPoint(x, y));
}