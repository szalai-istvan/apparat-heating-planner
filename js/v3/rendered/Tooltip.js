class Tooltip {
    text = '';
    cursorText = '';
    position = {};
    timeoutId;

    constructor(position) {
        this.position = position;
        renderer.register(this);
    }

    fileUploadSuccessful(next) {
        let f = fileName;
        if (f.length > 50) {
            const dot = f.indexOf('.');
            f = f.substr(0, 42) + ' ... ' + f.substr(dot);
        }
        if (f.length) {
            this.text = f + '\nfeltöltése sikeresen befejeződött!';
            if (next) setTimeout(next, 3_000);    
        }
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

const button4Position = topRibbonButtonPosition([REGULAR_BUTTON_SIZE, REGULAR_BUTTON_SIZE, REGULAR_BUTTON_SIZE]);
const tooltipPosition =  {x: button4Position.x, y: button4Position.y + REGULAR_BUTTON_SIZE.y / 2};
tooltipPosition.x += BUTTON_GAP_X;
const tooltip = new Tooltip(tooltipPosition);