import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/Constants.js";
import { DebugTools } from "../debug/Debug.js";
import { ButtonWrapperActions } from "../ui/buttons/ButtonWrapperActions.js";
import { DocumentData } from "../ui/DocumentData.js";
import { ImageAssets } from "../ui/ImageAssets.js";

/**
 * Felrajzolja a kijelzőre az abszolút pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderAbsolutePositionObjects() {
    drawUiBackground();
    elementStore.buttons.forEach(button => ButtonWrapperActions.renderButtonWrapper(button));
    // elementStore.menuLines.forEach(menu => drawMenuLine(menu));
    // elementStore.optionsBars.forEach(opt => drawOptionsBar(opt));

    DebugTools.drawCursorDebugInfo();
}

let apparatLogo;

/**
 * Felrajzolja a kijelzőre a UI hátteret
 * 
 * @returns {undefined}
 */
function drawUiBackground() {

    const documentSize = DocumentData.getDocumentSize(); // todo legyen változóban és onresize updatelve legyen.

    push();
    fill(Constants.ui.uiColor);
    noStroke();

    rect(0, 0, documentSize.x, Constants.ui.topRibbonHeight);
    rect(0, Constants.ui.topRibbonHeight, Constants.ui.leftRibbonWidth, documentSize.y - Constants.ui.topRibbonHeight);

    stroke(3);

    line(Constants.ui.leftRibbonWidth, Constants.ui.topRibbonHeight, documentSize.x, Constants.ui.topRibbonHeight);
    line(Constants.ui.leftRibbonWidth, Constants.ui.topRibbonHeight, Constants.ui.leftRibbonWidth, documentSize.y);

    for (let del of ApplicationState.delimiterPositions) {
        line(del.p1.x, del.p1.y, del.p2.x, del.p2.y);
    }

    textAlign(CENTER, CENTER);
    textSize(Constants.ui.uiTextSize);
    noStroke();
    fill(Constants.ui.defaultTextColor);
    for (let uiText of ApplicationState.uiTexts) {
        text(uiText.text, uiText.position.x, uiText.position.y);
    }

    image(ImageAssets.getApparatLogo(), documentSize.x - 293, 5, 287, 49.5);

    pop();
}

/**
 * Az abszolút pozíciójú objektumok rendereléséért felelős függvények gyüjteménye.
 */
export const AbsoluteObjectRenderer = {
    renderAbsolutePositionObjects
};