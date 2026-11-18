import { ElementStore } from "../../store/ElementStore.js";

/**
 * Gomb wrapper osztály.
 */
export class ButtonWrapper {
    /** @type {p5.Button} */
    button = null;
    /** @type {Function} */
    shouldBeActive = null;
    /** @type {boolean} */
    lastResult = false;
    /** @type {string} */
    translationKey = null;

    constructor({translationKey = null, text = null, size, position, onClick, shouldBeActive}) {
        this.translationKey = translationKey;
        this.button = createButton(text || '');
        this.shouldBeActive = shouldBeActive;
        this.lastResult = true;

        this.button.size(size.x, size.y);
        this.button.position(position.x, position.y);
        this.button.mouseClicked(onClick);

        ElementStore.save(this);
    }
}