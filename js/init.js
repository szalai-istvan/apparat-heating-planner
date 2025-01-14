var panelTypes = {
    'AP100': {
        length: 1,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP150': {
        length: 1.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP200': {
        length: 2,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP250': {
        length: 2.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP300': {
        length: 3,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP350': {
        length: 3.5,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP400': {
        length: 4,
        width: 0.4,
        tubeAmount: 'todo'
    },
    'AP450': {
        length: 4.5,
        width: 0.4,
        tubeAmount: 'todo'
    }
};

for (let type in panelTypes) {
    var option = document.createElement("option");
    option.text = type;
    option.value = type;
    addPanelTypeSelect.appendChild(option);
}