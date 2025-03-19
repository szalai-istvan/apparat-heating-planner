class BlueprintRenderer {

    static draw(blueprint) {
        if (getClassName(blueprint) !== 'Blueprint') {
            throw new Error('BlueprintRenderer can only render Blueprints!');
        }

        const data = blueprint.data;
        if (!data) {
            return;
        }

        const topLeftCoordinates = BlueprintManager.getTopLeftCoordinates(blueprint);

        topLeftCoordinates && image(data,
            topLeftCoordinates.x,
            topLeftCoordinates.y,
            data.width,
            data.height
        );
    }
}