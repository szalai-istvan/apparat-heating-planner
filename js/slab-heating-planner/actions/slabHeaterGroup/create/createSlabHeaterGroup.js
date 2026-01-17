let cachedSlabHeaterGroupAlignment = 1;

/**
 * Létrehoz és visszaad egy födém fűtő csoportot és visszaadja
 * 
 * @returns {SlabHeaterGroup} a létrehozott csoport
 */
function createSlabHeaterGroup() {
    const width = slabHeaterWidthOptionsBar.getValue();
    const length = slabHeaterLengthOptionsBar.getValue();

    if (!width) {
        displayMessage('A baloldali menü segítségével válassza ki a kívánt szélességet!');
        return;
    }

    if (!length) {
        displayMessage('A baloldali menü segítségével válassza ki a kívánt hosszt!');
        return;
    }

    const slabHeater = new SlabHeater();
    const group = new SlabHeaterGroup({ slabHeater, width, length, alignment: cachedSlabHeaterGroupAlignment });
    selectObject(group);
    group.isSelectedForDrag = true;
}