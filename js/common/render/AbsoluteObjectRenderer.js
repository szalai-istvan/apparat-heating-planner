import { ApplicationState } from "../appdata/ApplicationState.js";
import { Constants } from "../appdata/constants.js";
import { DebugTools } from "../debug/Debug.js";
import { ElementStore } from "../store/ElementStore.js";
import { ButtonWrapperActions } from "../ui/buttons/ButtonWrapperActions.js";
import { DocumentData } from "../ui/DocumentData.js";
import { ImageAssets } from "../ui/ImageAssets.js";
import { RenderMenuLine } from "../ui/MenuLine/RenderMenuLine.js";
import { MouseCursor } from "../ui/MouseCursor.js";
import { RenderOptionsBar } from "../ui/OptionsBar/RenderOptionsBar.js";

let showCicisNeni = false;
let timeoutId = null;
const cicisNeniScale = 0.4;

/**
 * Felrajzolja a kijelzőre az abszolút pozíciójú elemeket.
 * 
 * @returns {undefined}
 */
function renderAbsolutePositionObjects() {
    drawUiBackground();
    const buttons = ElementStore.findAll(Constants.classNames.buttonWrapper);
    const menuLines = ElementStore.findAll(Constants.classNames.menuLine);
    const optionsBars = ElementStore.findAll(Constants.classNames.optionsBar);
    
    buttons.forEach(button => ButtonWrapperActions.renderButtonWrapper(button));
    menuLines.forEach(menu => RenderMenuLine.renderMenuLine(menu));
    optionsBars.forEach(opt => RenderOptionsBar.renderOptionsBar(opt));

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

    if (mouseIsInsideLogo()) {
        if (!timeoutId) {
            timeoutId = setTimeout(() => showCicisNeni = true, 3_000);
        }
    } else {
        timeoutId && clearTimeout(timeoutId);
        showCicisNeni = false;
        timeoutId = null;
    }

    if (showCicisNeni) {
        image(ImageAssets.getCicisNeni(), documentSize.x - 313, 49, 316 * cicisNeniScale, 762 * cicisNeniScale);
    }

    pop();
}

function mouseIsInsideLogo() {
    const mouse = MouseCursor.getMousePosition();
    const documentSize = DocumentData.getDocumentSize();

    return mouse.x > documentSize.x - 293 && mouse.x < documentSize.x - 5 && mouse.y > 5 && mouse.y < 55;
}

/**
 * Az abszolút pozíciójú objektumok rendereléséért felelős függvények gyüjteménye.
 */
export const AbsoluteObjectRenderer = {
    renderAbsolutePositionObjects
};