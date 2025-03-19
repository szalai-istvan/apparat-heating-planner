class ButtonWrapperRenderer {

    static draw(buttonWrapper) {
        if (getClassName(buttonWrapper) !== 'ButtonWrapper') {
            throw new Error('ButtonWrapperRenderer can only render ButtonWrapper!');
        }
        const button = buttonWrapper.button;
        if (buttonWrapper.shouldBeRendered()) {
            button.show();
        } else {
            button.hide();
        }
    }
}
