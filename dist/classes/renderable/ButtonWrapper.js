import { createButton } from "../../declarations/declarations";
import { renderer } from "../Renderer";
export class ButtonWrapper {
    constructor(params) {
        const button = createButton(params.text);
        button.size(params.size.x, params.size.y);
        button.position(params.position.x, params.position.y);
        button.mouseClicked(params.onClick);
        this.button = button;
        this.shouldBeRendered = params.shouldBeRendered;
        renderer.register(this);
    }
    render() {
        const button = this.button;
        if (this.shouldBeRendered()) {
            button.show();
        }
        else {
            button.hide();
        }
    }
}
