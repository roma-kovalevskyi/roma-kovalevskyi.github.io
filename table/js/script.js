let rowsInput = document.getElementById('rows'),
    colsInput = document.getElementById('cols'),
    button = document.querySelector('.create-table'),
    formContainer = document.querySelector('.input-data-wrapper'),
    settings = document.querySelector('.settings'),
    tableContainer = document.querySelector('.table-wrapper'),
    tableCode = document.querySelector('.table-code');
    

/*-----------------------------validateForm-------------------------------*/
button.addEventListener('click', validateForm);

function validateForm() {
    let regexp = /\d+/;

    if (regexp.test(rowsInput.value) && regexp.test(colsInput.value)) {
        document.body.classList.add('changed');
        formContainer.classList.add('input-data_hidden');    
        settings.classList.add('settings_visible');  
        tableContainer.classList.add('table-wrapper_visible');  
        tableCode.classList.add('table-code_visible');

        createTable();
        
    } else {
        alert ('Заполните все поля числами!');
    }
}


/*-----------------------------createTable-------------------------------*/
function createTable() {
    let rows = parseInt(rowsInput.value),
        cols = parseInt(colsInput.value);

    let table = document.createElement('table');
    table.classList.add('table');
    tableContainer.appendChild(table);

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
    
        if (i === 0 ) {
            tr.classList.add('table__head')
        }

        tr.classList.add('table__row');
        table.appendChild(tr);

        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            td.classList.add('table__cell');
            tr.appendChild(td);
            let input = document.createElement('INPUT');
            input.type = 'text';
            input.classList.add('table__input');
            td.appendChild(input);
        }
    }
}


/*-----------------------------setCellWidth-------------------------------*/
tableContainer.addEventListener('input', setCellWidth);

function setCellWidth(e) {   
    let table = document.querySelector('.table'),
        target = e.target;

    if (target.tagName === 'INPUT') {
        target.style.width = ((target.value.length + 2) * 10) + 'px';
        if (table.offsetWidth > document.documentElement.clientWidth - 25) {
            target.blur();
        }
    }
}


/*-----------------------------changeBorderStyle-----------------------------*/
let buttonToggle = document.querySelector('.toggle-button'),
    list = document.querySelector('.toggle-list');

buttonToggle.addEventListener('click', function(e) {
    list.classList.toggle('toggle-list-active');
});

list.addEventListener('click', changeBorderStyle);

function changeBorderStyle(e) {
    let cells = document.querySelectorAll('.table__cell'),
        target = e.target;

    if (target.tagName === 'LI') {
        list.classList.remove('toggle-list-active');
    }

    for (let cell of  cells) {
        if (target.dataset.borderStyle === 'dashed') {
            cell.style.borderStyle = 'dashed';
        } 

        else if (target.dataset.borderStyle === 'dotted') {
            cell.style.borderStyle = 'dotted';
        } 

        else {
            cell.style.borderStyle = 'solid';
        }
        
    }
}


/*-----------------------------changeTableStyles-----------------------------*/
let borderColor = document.getElementById('border-color'),
    backgroundColor = document.getElementById('background-color'),
    textColor = document.getElementById('text-color');

borderColor.addEventListener("input", changeBorderColor);
backgroundColor.addEventListener("input", changeBackgroundColor);
textColor.addEventListener("input", changeTextColor);

function handlerChangeColor(propertyName, value) {
    let table = document.querySelector('.table'),
        headCells = document.querySelectorAll('.table__head .table__cell'),
        inputs = document.querySelectorAll('.table__input');

    if (propertyName === 'background-color') {
        for (let cell of headCells) {
            cell.style.setProperty(propertyName, value);
        } 

        table.style.borderBottom = `3px solid ${backgroundColor.value}`;
    } 
    else if (propertyName === 'color') {
        for (let input of inputs) {
            if (input.parentNode.parentNode.classList.contains('table__head')) continue;
            input.style.setProperty(propertyName, value);
        }
    } 
    else {
        for (let input of inputs) {
            input.parentNode.style.setProperty(propertyName, value);
        }
    }
}

function changeBorderColor() {
    handlerChangeColor('border-color', borderColor.value);
}

function changeBackgroundColor() {
    handlerChangeColor('background-color', backgroundColor.value);
}

function changeTextColor() {
    handlerChangeColor('color', textColor.value);
}


/*-----------------------------removeCells-----------------------------*/
let removeTableCells = document.querySelector('.constructor__remove-cells');
removeTableCells.addEventListener("click", removeCells);

function removeCells(e) {
    let table = document.querySelector('.table'),
        rows = document.querySelectorAll('.table__row'),
        lastRow = table.lastChild,
        target = e.target;

    if (target.tagName === 'BUTTON') {
        if (target.dataset.remove === 'row') {
            if (table.children.length === 2) {
                return;
            }

            lastRow.parentNode.removeChild(lastRow);
        } 
        else {
            for (let i = 0; i < rows.length; i++) {
                for (let j = rows[i].children.length - 1; j > 0; j--) {
                    if (j > 0) {
                        rows[i].children[j].parentNode.removeChild(rows[i].children[j]);
                        break;
                    }
                }
                
            }
        }
    }

}


/*-----------------------------insertCells-----------------------------*/
let insertTableRow = document.querySelector('.constructor__insert-cells');
insertTableRow.addEventListener("click", insertCells);

function insertCells(e) {
    let table = document.querySelector('.table'),
        rows = document.querySelectorAll('.table__row'),
        clonedRow = rows[rows.length - 1].cloneNode(true),
        clonedRowCells = [...clonedRow.children],
        target = e.target;

    if (target.tagName === 'BUTTON') {
        if (target.dataset.insert === 'row') {
            table.appendChild(clonedRow);   

            clonedRowCells.forEach(item => item.children[0].value = '');
        } 
        else {
            for (let row of rows) {
                let td = document.createElement('td');
                td.classList.add('table__cell');        
                row.appendChild(td);
                td.style.borderStyle = td.previousElementSibling.style.borderStyle;                
                td.style.backgroundColor = td.previousElementSibling.style.backgroundColor;   
                                       
                let input = document.createElement('INPUT');
                input.type = 'text';
                input.classList.add('table__input');        
                td.appendChild(input);        
            }
        }
    }
}


/*-----------------------------sortTable-----------------------------*/
let sortContainer = document.querySelector('.constructor__sort-table');
sortContainer.addEventListener("click", sortTable);

function sortTable(e) {
    let rows = document.querySelectorAll('.table__row'),
        array = [],
        target = e.target;

    for (let i = 0; i < rows.length; i++) {
        
        for (let j = 0; j < rows.length; j++) {
            if (j === 0) continue;
            array.push(rows[j].children[i].children[0].value);
        }

        if (target.tagName === 'BUTTON') {
            if (array.some(value => isNaN(+value))) { // если хоть один элемент массива не число
                if (target.dataset.index === 'plus') {
                    array.sort(); // по возрастанию
                } else {
                    array.sort().reverse(); // по убыванию
                }

            } else {
                if (target.dataset.index === 'plus') {
                    array.sort((a,b) => a - b); // по возрастанию
                } else {
                    array.sort((a,b) => b - a); // по убыванию
                }
            }

            for (let j = 0; j < rows.length; j++) {
                if (j === 0) continue;
                rows[j].children[i].children[0].value = array.splice(0, 1);
            } 
        }
    }
}


/*-----------------------------clearTable-----------------------------*/
let buttonClear = document.querySelector('.clear');
buttonClear.addEventListener("click", clearTable);

function clearTable() {
    let inputs = document.querySelectorAll('.table__input');  

    for (let input of inputs) {
        input.value = '';
    }
}


/*-----------------------------generateTableCode-----------------------------*/
let buttonGenerateCode = document.querySelector('.generate-code');
buttonGenerateCode.addEventListener("click", generateTableCode);

function generateTableCode() {
    let isConfirm = confirm("Внимание! После этого редактирование таблицы будет запрещено. Продолжить?");

    if (isConfirm) {
        let table = document.querySelector('.table'),
            cells = document.querySelectorAll('.table__cell'),
            textarea = document.querySelector('.table-code__textarea');

        for (var i = 0; i < cells.length; i++) {
            if (!cells[i].parentNode.classList.contains('table__head')) {
                cells[i].style.color = cells[i].children[0].style.color || '#999999';
            } 
            
            cells[i].innerHTML = cells[i].children[0].value;
        }    

        textarea.value = 

`<style type="text/css">
.table {
    border-collapse: collapse;
    border-bottom: 3px solid #00cccd;
    box-shadow: 0 0 5px #b9b9b9;
    font-family: Arial, sans-serif;
}

.table__head .table__cell {
    background-color: #00cccd;
    font-weight: bold;
}

.table__cell {
    border: 1px solid #d5e8f5;
    background-color: #fff;
    width: 55px;
    height: 55px;
    color: #fff;
    text-align: center;
    font-size: 18px;
    padding: 10px 8px 8px 8px;
}
</style> 

${table.outerHTML}`;

    }
}


/*-----------------------------copyTableCode-----------------------------*/
let buttonCopyCode = document.querySelector('.copy-code');
buttonCopyCode.addEventListener("click", copyTableCode);

function copyTableCode() {
    let textarea = document.querySelector('.table-code__textarea');

    textarea.select();
    document.execCommand('copy');
}



