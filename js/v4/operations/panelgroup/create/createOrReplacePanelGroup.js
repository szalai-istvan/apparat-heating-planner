let cachedPanelGroupAlignment = 1;

/**
 * Létrehoz és visszaad egy fűtő csoportot és visszaadja.
 * 
 * @param {string} type, típus 
 * @returns {PanelGroup}, a létrehozott panelcsoport
 */
function createOrReplacePanelGroup(type) {
    checkClass(type, CLASS_STRING);
    
    const panel = new Panel();
    const group = new PanelGroup({panel, type});

    selectObject(group);
    group.isSelected = true;
    group.isSelectedForDrag = true;
}