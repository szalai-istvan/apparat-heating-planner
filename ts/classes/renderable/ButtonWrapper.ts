import { createButton, P5Button } from "../../declarations/declarations";
import { ButtonWrapperCreateParams, Renderable, Supplier } from "../../types/types";
import { renderer } from "../Renderer";

export class ButtonWrapper implements Renderable {
    private button: P5Button;
    private shouldBeRendered: Supplier<boolean>;

    constructor(params: ButtonWrapperCreateParams) {
        const button = createButton(params.text);
        button.size(params.size.x, params.size.y);
        button.position(params.position.x, params.position.y);
        button.mouseClicked(params.onClick);

        this.button = button;
        this.shouldBeRendered = params.shouldBeRendered;

        renderer.register(this);
    }

    public render(): void {
        const button = this.button;
        if (this.shouldBeRendered()) {
            button.show();
        } else {
            button.hide();
        }
    }
}