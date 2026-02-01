import { PanelGroup } from "../entities/PanelGroup.js";

/**
 * Projekt specifikus alkalmazás állapot.
 */
export const HeatingPlannerApplicationState = {
    /** @type {PanelGroup} */
    selectedPanelGroup: null,
    /** @type {Number} */
    panelLineWeight: null,
    /** @type {Number} */
    panelTextSize: null,
    /** @type {Number} */
    panelTextBoxWidth: null,
    /** @type {Number} */
    panelTextBoxHeight: null,
    /** @type {Number} */
    beamLineWidthPixel: null,
    /** @type {Number} */
    beamWidthPixel: null,
    /** @type {Number} */
    ud30WidthPixel: null,
    /** @type {Number} */
    beamTextSize: null,
    /** @type {Number} */
    pixelsBetweenBeams: null,
    /** @type {Number} */
    beamsMinimumOffset: null
};