function retrieveSlabHeaterColor() {
    if (SLAB_HEATER_COLORS_AVAILABLE.length) {
        const color = randomChoice(SLAB_HEATER_COLORS_AVAILABLE);
        SLAB_HEATER_COLORS_AVAILABLE = SLAB_HEATER_COLORS_AVAILABLE.filter(x => x !== color);
        return color;
    }
    return randomChoice(SLAB_HEATER_COLORS);
}

function giveBackSlabHeaterColor(color) {
    if (SLAB_HEATER_COLORS_AVAILABLE.includes(color)) {
        return;
    }
    SLAB_HEATER_COLORS_AVAILABLE.push(color);
}

function offsetSlabHeaterCenterPosition({ originalCenter, width, alignment, index }) {
    const verticalOffset = alignment % 2 === 0;
    const offsetValue = width * pixelsPerMetersRatio * index;

    if (verticalOffset) {
        return createPoint(originalCenter.x, originalCenter.y + offsetValue);
    }
    return createPoint(originalCenter.x + offsetValue, originalCenter.y);
}