class Tooltip {
    #text = '';
    #cursorText = '';
    #position = {};
    #timeoutId;

    constructor(position) {
        this.#position = position;
    }

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
            textSize(12);
            fill('white');

            const width = textWidth(this.#cursorText);
            rect(mouseX + 18, mouseY + 18, width + 4, 16);
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
        this.#timeoutId = setTimeout(() => this.clearCursorTooltip(), 10_000);
    }

    clearTooltip() {
        this.#text = '';
    }

    clearCursorTooltip() {
        this.#cursorText = '';
    }
}

const tooltip = new Tooltip(tooltipPosition());