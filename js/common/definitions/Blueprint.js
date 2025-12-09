class Blueprint {
    data;
    topLeftPosition;
    centerPosition;
    angleDeg = 0.00;

    isSelected;

    constructor(data, topLeftPosition) {
        this.data = data;
        this.topLeftPosition = topLeftPosition;
    }
}