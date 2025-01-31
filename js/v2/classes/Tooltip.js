class Tooltip {
    #text = '';
    #cursorText = '';
    #position = {};
    #timeoutId;

    constructor(position) {
        this.#position = position;
    }

    // public
    draw() {
        if (this.#text) {            
            const position = this.#position;
            fill('black');
            textAlign(LEFT, CENTER);
            textSize(18);
            text(this.#text, position.x, position.y);
        }

        if (this.#cursorText) {
            textAlign(LEFT, TOP);
            textSize(16);
            fill('white');

            const width = this.#textWidth(this.#cursorText);
            rect(mouseX + 18, mouseY + 18, width + 4, 20 * (1 + this.#numberOfLineBreaks(this.#cursorText)));
            fill('black');

            text(this.#cursorText, mouseX + 20, mouseY + 20);
        }
    }

    displayTooltip(key) {
        this.#text = tooltipText[key] || '';
    }

    displayTooltipIf(presentKey, key) {
        if (this.#text === tooltipText[presentKey]) {
            this.displayTooltip(key);
        }
    }

    displayCursorTooltip(key) {
        this.#cursorText = tooltipText[key];

        if (this.#timeoutId) {
            clearTimeout(this.#timeoutId);
        }
        this.#timeoutId = setTimeout(() => this.clearCursorTooltip(), 15_000);
    }

    clearTooltip() {
        this.#text = '';
    }

    clearCursorTooltip() {
        this.#cursorText = '';
    }

    applicationStarted() {
        this.displayTooltip(WELCOME);
        setTimeout(() => this.displayTooltipIf(WELCOME, DRAWING_UPLOAD), 4_000);
    }

    fileIsUploaded() {
        this.displayTooltip(SCALING_0);
        this.displayCursorTooltip(DRAWING_NAV);
    }

    scalingStarted() {
        this.displayCursorTooltip(SCALING_1);
    }

    firstReferencePointAdded() {
        this.displayCursorTooltip(SCALING_2);
    }

    scalingFinished() {
        this.displayTooltip(ROOM_ADD);
    }

    roomAddingStarted() {
        this.displayCursorTooltip(ROOM_0);
    }

    roomAddingFinished() {
        this.clearCursorTooltip();
        this.displayTooltip(ROOM_1);
    }

    panelAdded() {
        this.displayTooltip(PANEL_0);
        this.displayCursorTooltip(PANEL_1);
    }

    roomNameHovered() {
        this.displayCursorTooltip(ROOM_HOVER);
    }

    roomNameUnhovered() {
        if (this.#cursorText === tooltipText[ROOM_HOVER]) {
            this.clearCursorTooltip();
        }
    }

    roomSelected() {
        this.displayCursorTooltip(ROOM_SELECT);
    }

    roomDeselected() {
        this.clearCursorTooltip();
    }
    
    // private
    #numberOfLineBreaks(text) {
        return text.split('\n').length - 1;
    }

    #textWidth(text) {
        return text.split('\n').map(line => textWidth(line)).reduce(maximumFunction);
    }
}

const tooltip = new Tooltip(tooltipPosition());