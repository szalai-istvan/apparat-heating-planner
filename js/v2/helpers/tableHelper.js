function createTable() {
    return document.createElement('table');
}

function addRow(table, rowDataArray, backgroundColor) {
    const tr = document.createElement('tr');
    tr.classList.add('table-row');
    table.appendChild(tr);

    if (backgroundColor) {
        tr.style['background-color'] = backgroundColor;
    }

    for (let text of rowDataArray) {
        const td = document.createElement('td');
        tr.appendChild(td);
        td.classList.add('table-data');
        td.innerHTML = text;
    }
}

function addHeaderRow(table, headerText, colspan) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const td = document.createElement('td');
    td.classList.add('header-row');
    tr.appendChild(td);
    td.setAttribute('colspan', colspan);
    td.innerHTML = headerText;
}