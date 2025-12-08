/**
 * Felrajzolja a kijelzőre a paraméterül kapott MenuLine objektumot
 * 
 * @param {MenuLine} menuLine paraméter
 * @returns {undefined}
 */
function drawMenuLine(menuLine) {
    if (menuLine.shouldBeRendered()) {
        menuLine.baseButton.show();
    } else {
        menuLine.baseButton.hide();
        menuLine.menuItems.forEach(b => b.hide());
    }
}