class PanelRenderer {

    static draw(panel) {
        if (getClassName(panel) !== 'Panel') {
            throw new Error('PanelRenderer can only render Panels!');
        }

        const ratio = scaleContext.pixelsPerMetersRatio;
        const length = panel.lengthInPixels;
        const width = panel.widthInPixels;
        const coordinates = panel.isSelectedForDrag ? PanelManager.mousePositionAsCenterOfPanel(panel) : panel.topLeftCoordinates;
        PanelRenderer.translateAndRotate(panel, coordinates);

        for(let offset = 0; offset < panel.numberOfPanelsInGroup; offset++) {
            PanelRenderer.drawWithOffset({panel, ratio, length, width, offset});
        }

        PanelRenderer.translateBack(coordinates);
    }

    static drawType(panel) {
        if (getClassName(panel) !== 'Panel') {
            throw new Error('PanelRenderer can only render Panels!');
        }

        const coordinates = panel.isSelectedForDrag ? PanelManager.mousePositionAsCenterOfPanel(panel) : panel.topLeftCoordinates;
        PanelRenderer.translateAndRotate(panel, coordinates);

        for (let offset = 0; offset < panel.numberOfPanelsInGroup; offset++) {
            const coordinates = PanelRenderer.getTextCenter(panel, offset);
            stroke('black');
            fill(PANEL_FILL_COLOR);
            const rectWidth = panel.textWidth * PANEL_TEXT_RECT_SIZE_MUL;
            const rectHeight = panel.widthInPixels * 0.5 * PANEL_TEXT_RECT_SIZE_MUL;
            rect(
                coordinates.x - rectWidth / 2,
                coordinates.y - rectHeight / 2,
                rectWidth,
                rectHeight
            );
    
            textAlign(CENTER, CENTER);
            const pointIsInsideText = PanelManager.mouseCursorIsInsideText(panel);
            if (pointIsInsideText || (panel.isSelected && !panel.isSelectedForDrag)) {
                fill(SELECTED_TEXT_COLOR);
            } else {
                fill(DEFAULT_TEXT_COLOR);
            }
    
            const p = PANEL_TEXT_POP_FACTOR;
            textSize(panel.textSize * (1 + p * panel.isSelected + p * pointIsInsideText));
            text(panel.type, coordinates.x, coordinates.y);
        }
        PanelRenderer.translateBack(coordinates);
    }

    static drawWithOffset({panel, ratio, length, width, offset}) {
        const widthOffset = width * offset;

        strokeWeight(panel.countourLineWeight);
        stroke('black');
        fill(PANEL_FILL_COLOR);
        translate(0, widthOffset);
        rect(0, 0, length, width);

        strokeWeight(panel.lineWeight);

        const i = width / 9;
        for (let pipeNumber = i; pipeNumber < width; pipeNumber += i) {
            line(0, pipeNumber, length, pipeNumber);
        }

        PanelRenderer.drawTubes({panel, ratio, length, width, offset});
        translate(0, -widthOffset);
    }

    
    static drawTubes({panel, ratio, length, width, offset}) {
        const panelTubeExtraLength = PANEL_TUBE_EXTRA_LENGTH_PER_SIDE * scaleContext.pixelsPerMetersRatio;
        const panelStep = PANEL_TUBE_EXTRA_LENGTH_STEP * scaleContext.pixelsPerMetersRatio;

        noFill();
        strokeWeight(panel.lineWeight);

        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 3,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 0
        });
        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 4,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 0
        });
        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 5,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 0
        });

        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 1,
            endpoint2: 8,
            length: panelTubeExtraLength,
            side: 1
        });
        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 2,
            endpoint2: 7,
            length: panelTubeExtraLength - panelStep,
            side: 1
        });
        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 3,
            endpoint2: 6,
            length: panelTubeExtraLength - 2 * panelStep,
            side: 1
        });
        PanelRenderer.drawOneTube({
            panel: panel,
            endpoint1: 4,
            endpoint2: 5,
            length: panelTubeExtraLength - 3 * panelStep,
            side: 1
        });

        const y1 = panel.widthInPixels / 9;
        const y2 = 2 * y1;
        const x2 = -panelTubeExtraLength;
        line(0, y1, x2, y1);
        line(0, y2, x2, y2);
    }

    static drawOneTube({panel, endpoint1, endpoint2, length, side}) {
        const diameter = Math.abs(endpoint2 - endpoint1) * panel.widthInPixels / 9;
        const straightLength = length - diameter / 2;

        const x1 = side ? panel.lengthInPixels : 0;
        const x2 = side ? panel.lengthInPixels + straightLength : -straightLength;
        const y1 = endpoint1 * panel.widthInPixels / 9;
        const y2 = endpoint2 * panel.widthInPixels / 9;
        const centerY = (y1 + y2) / 2;

        line(x1, y1, x2, y1);
        line(x1, y2, x2, y2);

        const angle1 = side ? -90 : 90;
        const angle2 = side ? 90 : 270;
        arc(x2, centerY, diameter, diameter, angle1, angle2);
    }

    static translateAndRotate(panel, coordinates) {
        push();
        translate(coordinates.x, coordinates.y);
        rotate(panel.alignment * 90);
    }

    static translateBack(coordinates) {
        translate(-coordinates.x, -coordinates.y);
        pop();

    }

    static getTextCenter(panel, offset) {
        return {
            x: panel.lengthInPixels * 0.5,
            y: panel.widthInPixels * (0.5 + offset)
        };
    }
}