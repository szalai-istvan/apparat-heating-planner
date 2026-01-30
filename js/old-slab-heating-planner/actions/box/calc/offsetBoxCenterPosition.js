function offsetBoxCenterPosition({ originalCenter, width, alignment, index }) {
    const verticalOffset = alignment % 2 === 1;
    const offsetValue = width * pixelsPerMetersRatio * index;

    if (verticalOffset) {
        return createPoint(originalCenter.x, originalCenter.y + offsetValue);
    }
    return createPoint(originalCenter.x + offsetValue, originalCenter.y);
}