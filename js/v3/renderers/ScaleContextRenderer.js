class ScaleContextRenderer {

    static draw(scaleContext) {
        if (getClassName(scaleContext) !== 'ScaleContext') {
            throw new Error('ScaleContextRenderer can only render ScaleContext!');
        }

        const scalingInProgress = scaleContext.scalingInProgress;
        if (!scalingInProgress) {
            return;
        }

        const firstPoint = scaleContext.firstPoint;
        const secondPoint = scaleContext.secondPoint;

        if (!firstPoint) {
            return;
        }

        if (secondPoint) {
            line(firstPoint.x, firstPoint.y, secondPoint.x, secondPoint.y);
        } else {
            const mousePosition = screenContext.getMousePositionAbsolute();
            line(firstPoint.x, firstPoint.y, mousePosition.x, mousePosition.y);
        }
        
    }
}