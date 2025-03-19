class Tooltip {
    text = '';
    cursorText = '';
    position = {};
    timeoutId;

    constructor(position) {
        this.position = position;
        renderer.register(this);
    }

    displayTooltip(key) {
        this.text = tooltipText[key] || '';
    }

    displayTooltipIf(presentKey, key) {
        if (this.text === tooltipText[presentKey]) {
            this.displayTooltip(key);
        }
    }

    displayCursorTooltip(key) {
        this.cursorText = tooltipText[key];

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => this.clearCursorTooltip(), 15_000);
    }

    clearTooltip() {
        this.text = '';
    }

    clearCursorTooltip() {
        this.cursorText = '';
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
        this.displayTooltip(SCALING_0);
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

    roomNameHovered() {
        this.displayCursorTooltip(ROOM_HOVER);
    }

    roomNameUnhovered() {
        if (this.cursorText === tooltipText[ROOM_HOVER]) {
            this.clearCursorTooltip();
        }
    }

    roomSelected() {
        this.displayCursorTooltip(ROOM_SELECT);
    }

    roomDeselected() {
        this.clearCursorTooltip();
    }
    
    panelAdded() {
        this.displayTooltip(PANEL_0);
        this.displayCursorTooltip(PANEL_1);
    }

    panelHovered() {
        this.displayCursorTooltip(PANEL_HOVER);
    }

    panelUnhovered() {
        if (this.cursorText === tooltipText[PANEL_HOVER]) {
            this.clearCursorTooltip();
        }
    }

    panelSelected() {
        this.displayCursorTooltip(PANEL_SELECT);
    }

    panelSelectedForDrag() {
        this.displayCursorTooltip(PANEL_1);
    }
    
    numberOfLineBreaks(text) {
        return text.split('\n').length - 1;
    }

    textWidth(text) {
        return text.split('\n').map(line => textWidth(line)).reduce(maximumFunction);
    }
}

const tooltip = new Tooltip(tooltipPosition());