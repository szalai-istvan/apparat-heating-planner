let displayTooltips = true;
class TooltipRenderer____ {

    static toggleTooltipDisplay() {
        displayTooltips = !displayTooltips;
    }

    static draw(tooltip) {
        if (!displayTooltips) {
            return;
        }

        if (getClassName(tooltip) !== 'Tooltip') {
            throw new Error('TooltipRenderer can only render Tooltips!');
        }

        if (tooltip.text) {            
            const position = tooltip.position;
            fill(BLACK);
            textAlign(LEFT, CENTER);
            textSize(18);
            text(tooltip.text, position.x, position.y);
        }

        if (tooltip.cursorText) {
            textAlign(LEFT, TOP);
            textSize(16);
            fill(WHITE);

            const width = tooltip.textWidth(tooltip.cursorText);
            rect(mouseX + 18, mouseY + 18, width + 4, 20 * (1 + tooltip.numberOfLineBreaks(tooltip.cursorText)));
            fill(BLACK);

            text(tooltip.cursorText, mouseX + 20, mouseY + 20);
        }
    }
}