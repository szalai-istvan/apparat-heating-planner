import { Constants } from "../../appdata/Constants.js";
import { ElementStore } from "../../store/ElementStore.js";

/**
 * Egy menüsort reprezentáló class.
 */
export class OptionsBar {
    columns = [];
    selected = [];
    columnHeaders = [];
    columnHeaderPositions = [];
    title;
    titlePosition;
    perColumnSelection;
    onchange;

    shouldBeActive;

    constructor({ topLeftPosition, buttonSize, gap, columns, valueResolver, shouldBeActive, title, perColumnSelection, onchange }) {
        this.shouldBeActive = shouldBeActive;
        this.valueResolver = valueResolver;
        this.title = title;
        if (onchange) {
            this.onchange = onchange;
        }

        const thereAreHeaders = columns.filter(c => c.header).filter(a => a)[0];
        this.titlePosition = getTitlePosition(topLeftPosition, buttonSize, gap, columns.length, thereAreHeaders);

        this.perColumnSelection = perColumnSelection ?? true;

        for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
            const column = columns[columnIndex];
            this.selected.push(undefined);
            this.columns.push([]);
            this.columnHeaders.push(column.header);
            this.columnHeaderPositions.push(getTextPosition(topLeftPosition, buttonSize, gap, columnIndex, 1));

            const col = this.columns[columnIndex];
            for (let buttonIndex = 0; buttonIndex < column.buttons.length; buttonIndex++) {
                const text = column.buttons[buttonIndex];
                const ci_ = columnIndex;
                const offset = column.header ? 2 : 1;

                const button = new ButtonWrapper({
                    text: text,
                    size: buttonSize,
                    position: getButtonPosition(topLeftPosition, buttonSize, gap, columnIndex, buttonIndex + offset),
                    onClick: () => this.setValue(ci_, text),
                    shouldBeActive: () => this.shouldBeActive(),
                });
                col.push(button);
            }
        }

        ElementStore.save(this);
    }

    setValue(columnIndex, text, runOnchange = true) {
        const column = this.getColumnsForSetValue(columnIndex);
        for (let button of column) {
            button.button.style(Constants.strings.background, null);
        }

        if (this.perColumnSelection) {
            this.selected[columnIndex] = text;
        } else {
            this.selected = [text];
        }
        const selectedButton = column.filter(c => c.button.elt.innerHTML === text)[0];
        if (selectedButton) {
            selectedButton.button.style(Constants.strings.background, Constants.strings.darkgrey);
        }

        this.onchange && runOnchange && this.onchange();
    }

    getValue() {
        return this.valueResolver(this);
    }

    allValuesAreSet() {
        return this.selected.filter(sel => sel).length === this.selected.length;
    }

    getColumnsForSetValue(columnIndex) {
        if (this.perColumnSelection) {
            return this.columns[columnIndex];
        }

        let column = [];
        for (let col of this.columns) {
            column = [...column, ...col];
        }
        return column;
    }
}

function getButtonPosition(topLeftPosition, buttonSize, gap, columnIndex, buttonIndex) {
    return {
        x: topLeftPosition.x + buttonSize.x * columnIndex + gap.x * Math.max(columnIndex, 0),
        y: topLeftPosition.y + buttonSize.y * buttonIndex + gap.y * Math.max(buttonIndex, 0) - buttonSize.y / 3
    };
}

function getTextPosition(topLeftPosition, buttonSize, gap, columnIndex, buttonIndex) {
    return {
        x: topLeftPosition.x + buttonSize.x * columnIndex + gap.x * Math.max(columnIndex, 0) + buttonSize.x / 2,
        y: topLeftPosition.y + buttonSize.y * buttonIndex + gap.y * Math.max(buttonIndex, 0) + buttonSize.y / 2
    };
}

function getTitlePosition(topLeftPosition, buttonSize, gap, numberOfColumns, thereAreColumnHeaders) {
    return {
        x: topLeftPosition.x + 0.5 * (buttonSize.x * numberOfColumns + gap.x * Math.max(numberOfColumns, 0)),
        y: topLeftPosition.y + buttonSize.y * (thereAreColumnHeaders ? 1 : 0.5)
    };
}