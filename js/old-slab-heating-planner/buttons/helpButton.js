var helpButton;

function repositionHelpButton() {
    const helpButtonPos = bottomPosition(TALL_SMALL_BUTTON_SIZE);
    helpButton.button.position(helpButtonPos.x, helpButtonPos.y);
}