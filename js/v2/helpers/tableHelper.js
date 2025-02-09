function createTable() {
    return document.createElement('table');
}

function addRow(table, rowDataArray) {
    const tr = document.createElement('tr');
    table.appendChild(tr);

    for (let text of rowDataArray) {
        const td = document.createElement('td');
        tr.appendChild(td);
        td.innerHTML = text;
    }
}

function addHeaderRow(table, headerText, colspan) {
    const tr = document.createElement('tr');
    table.appendChild(tr);
    const td = document.createElement('td');
    td.classList.add('header');
    tr.appendChild(td);
    td.setAttribute('colspan', colspan);
    td.innerHTML = headerText;
}