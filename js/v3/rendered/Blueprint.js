class Blueprint {
    data;
    topLeftPosition;

    constructor(data, topLeftPosition) {
        this.data = data;
        this.topLeftPosition = topLeftPosition;
        renderer.register(this);

        if (!scaleContext.ratioIsSet()) {
            tooltip.fileUploadSuccessful(() => tooltip.fileIsUploaded());
        } else {
            tooltip.fileUploadSuccessful(() => {});
        }
    }
}