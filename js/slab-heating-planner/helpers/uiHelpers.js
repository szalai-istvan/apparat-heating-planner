function calculateCorrector(lim, coord) {
    const dif = lim - coord;
    return (Math.abs(dif) + dif) / (2 * screenZoom);
}