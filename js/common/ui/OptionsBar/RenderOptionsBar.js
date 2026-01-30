import { Constants } from "../../appdata/Constants.js";
import { OptionsBar } from "./OptionsBar.js";

/**
 * Felrajzolja a képernyőre a paraméterül kapott optionsbar objektumot.
 * 
 * @param {OptionsBar} optionsBar 
 * @returns {undefined}
 */
function renderOptionsBar(optionsBar) {
    push();

    textSize(Constants.ui.optionsBarTextSize);
    textAlign(CENTER, CENTER);
    fill(Constants.ui.defaultTextColor);

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

/**
 * OptionsBar renderelési műveletek
 */
export const RenderOptionsBar = {
    renderOptionsBar
};