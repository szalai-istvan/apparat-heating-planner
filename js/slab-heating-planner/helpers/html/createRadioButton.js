function createRadioButton(name, value, onchange) {
    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    const id = value.toLowerCase();
    input.setAttribute('id', id);
    input.setAttribute('name', name);
    input.setAttribute('value', value);

    const label = document.createElement('label');
    label.setAttribute('for', id)
    label.innerHTML = value;
    label.classList.add('radio-label');

    const span = document.createElement('span');
    span.appendChild(input);
    span.appendChild(label);
    input.addEventListener(CHANGE, onchange);
    return span;
}