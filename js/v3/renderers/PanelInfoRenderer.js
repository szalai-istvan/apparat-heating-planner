class PanelInfoRenderer {
    static draw() {
        const panel = panelContext.selectedPanel;
        if (!panel) {
            return;
        }

        const amount = panel.numberOfPanelsInGroup;
        const type = panel.type;
        const renderedText = `${type}, ${amount} db`;

        push();
        textAlign(CENTER, CENTER);
        textSize(14);
        text(renderedText, 50, 605);
        pop();
    }
}