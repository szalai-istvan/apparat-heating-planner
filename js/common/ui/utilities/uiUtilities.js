/**
 * Korrigálja az adott limithez a paraméterül kapott koordinátát
 * 
 * @param {number} lim limit paraméter
 * @param {number} coord koordináta paraméter
 * @returns korrigált koordinátaérték
 */
function calculateCorrector(lim, coord) {
    const dif = lim - coord;
    return (Math.abs(dif) + dif) / (2 * screenZoom);
}

/**
 * Megállapítja, hogy folyamatban van-e valamilyen felhasználói művelet
 * 
 * @returns {boolean}
 */
function operationInProgress() {
    if (scalingInProgress) {
        return true;
    }
    
    if (selectedRoom && !roomIsConfigured(selectedRoom)) {
        return true;
    }

    return false;
}

function addOperationDescriptionToCursor() {
    push();

    textAlign(LEFT, BOTTOM);
    textSize(16);
    fill(BLACK);
    stroke(BLACK);
    strokeWeight(1);
    const mousePosition = getMousePosition();

    if (scalingInProgress) {
        text('✏️', mousePosition.x + 3, mousePosition.y - 3);
    } else if (selectedRoom && !roomIsConfigured(selectedRoom)) {
        text('✏️', mousePosition.x + 3, mousePosition.y - 3);
    }

    pop();
}