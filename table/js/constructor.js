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
                td.style.borderColor = td.previousElementSibling.style.borderColor;                
                td.style.backgroundColor = td.previousElementSibling.style.backgroundColor;
                                       
                let input = document.createElement('INPUT');
                input.type = 'text';
                input.classList.add('table__input');  
                td.appendChild(input);    
                
                input.style.color = input.parentNode.previousElementSibling.children[0].style.color; 
            }
        }
    }
}


/*-----------------------------sortTable-----------------------------*/
let sortContainer = document.querySelector('.constructor__sort-table');
sortContainer.addEventListener("click", sortTable);

function sortTable(e) {
    let rows = document.querySelectorAll('.table__row'),
        numberCells = document.querySelectorAll('.table__head .table__cell').length,
        array = [],
        target = e.target;

    for (let i = 0; i < numberCells; i++) {
        
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