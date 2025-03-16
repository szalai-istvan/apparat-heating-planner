export interface BlueprintSizeData extends Coordinates {
    w: number,
    h: number
}

export interface BoundaryPoints {
    p1: Coordinates,
    p2: Coordinates
}

export interface ButtonWrapperCreateParams {
    text: string,
    size: Coordinates,
    position: Coordinates,
    onClick: Function,
    shouldBeRendered: Supplier<boolean>
}

export interface Coordinates {
    x: number,
    y: number
}

export interface Dimensions {
    width: number,
    length: number
}

export interface Renderable {
    render: Supplier<void>
}

export interface Selectable {
    select: Supplier<void>,
    tryToDeselect: Supplier<boolean>
}

export interface PanelDrawOffsetParams {
    ratio: number,
    length: number,
    width: number,
    offset: number
}
export interface PanelType {
    length: number,
    width: number,
    pipeLength: number
}

export type Supplier<T> = () => T;