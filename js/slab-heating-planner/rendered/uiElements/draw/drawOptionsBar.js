/**
 * Felrajzolja a képernyőre a paraméterül kapott optionsbar objektumot.
 * 
 * @param {OptionsBar} optionsBar 
 * @returns {undefined}
 */
function drawOptionsBar(optionsBar) {
    push();

    textSize(OPTIONS_BAR_TEXT_SIZE);
    textAlign(CENTER, CENTER);
    fill(DEFAULT_TEXT_COLOR);

    for (let index = 0; index < optionsBar.columnHeaders.length; index++) {
        const columnHeader = optionsBar.columnHeaders[index];
        const headerPosition = optionsBar.columnHeaderPositions[index];

        if (!columnHeader) {
            continue;
        }
        text(columnHeader, headerPosition.x, headerPosition.y);
    }

    const title = optionsBar.title;
    const titlePosition = optionsBar.titlePosition;
    text(title, titlePosition.x, titlePosition.y);
    pop();
}