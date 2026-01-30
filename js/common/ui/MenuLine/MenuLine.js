import { ElementStore } from "../../store/ElementStore.js";

/**
 * Egy menüszalagot reprezentáló UI element osztály.
 */
export class MenuLine {
    position;
    size;
    baseButton;
    menuItems = [];
    value;
    menuItemsShown = false;
    hideTimeOutId;
    valueSet = {};
    shouldBeActive;
    selectionMenuMode;

    constructor({position, size, optionSize, text, buttons, labelerFunc, shouldBeActive, buttonsClickFunctions, selectionMenuMode}) {
        this.position = position;
        this.size = size;
        this.text = text + ' >';
        this.shouldBeActive = shouldBeActive;
        this.selectionMenuMode = selectionMenuMode ?? true;

        this.baseButton = createButton(this.text);
        const baseButton = this.baseButton;
        baseButton.size(size.x, size.y);
        baseButton.position(position.x, position.y);
        baseButton.mouseClicked(() => this.baseButtonClick());

        let i = 0;
        const labeler = labelerFunc ? labelerFunc : a => a;
        buttonsClickFunctions = buttonsClickFunctions || [];
        for (let button of buttons) {
            const label = labeler(button);
            const menuItem = createButton(label);
            this.valueSet[label] = button;

            menuItem.size(optionSize.x, optionSize.y);
            menuItem.position(position.x + size.x, position.y + optionSize.y * i);
            menuItem.style('border-radius', '0');
            menuItem.style('border', '1px solid black');
            menuItem.elt.classList.add('hovered');
            if (buttonsClickFunctions[i]) {
                const func = buttonsClickFunctions[i];
                menuItem.mouseClicked(() => {func(); setTimeout(() => this.hideMenuItems(), 300);});
            } else {
                menuItem.mouseClicked(() => this.selectMenuItem(label));
            }
            i++;

            this.menuItems.push(menuItem);
        }

        this.hideMenuItems();
        ElementStore.save(this);
    }

    selectMenuItem(text) {
        setTimeout(() => this.hideMenuItems(), 300);
        for (let menuItem of this.menuItems) {
            menuItem.style(Constants.strings.background, null);
        }

        const selected = this.menuItems.filter(button => button.elt.innerHTML === text)[0];        
        if (this.selectionMenuMode) {
            selected.style(Constants.strings.background, 'darkgrey');
        }

        this.value = this.valueSet[selected.elt.innerHTML];
        this.baseButton.elt.innerHTML = this.text + '<br/>' + '(' + text + ')';
    }

    showMenuItems() {
        elementStore.menuLines.forEach(menu => menu.hideMenuItems());
        this.menuItemsShown = true;
        for (let button of this.menuItems) {
            button.show();
        }
    }

    hideMenuItems() {
        this.menuItemsShown = false;
        for (let button of this.menuItems) {
            button.hide();
        }
    }

    baseButtonClick() {
        if (this.menuItemsShown) {
                this.menuItemsShown = false;
                this.hideMenuItems();
                return;
        }
        if (this.hideTimeOutId) {
            clearTimeout(this.hideTimeOutId);
        }
        this.menuItemsShown = true;
        this.showMenuItems();
        this.hideTimeOutId = setTimeout(() => this.hideMenuItems(), 5_000);
    }
}