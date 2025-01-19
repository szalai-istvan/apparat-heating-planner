for (let type in panelTypes) {
    var option = document.createElement("option");
    option.text = type;
    option.value = type;
    addPanelTypeSelect.appendChild(option);
}