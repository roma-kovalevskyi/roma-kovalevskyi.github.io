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
    let regexp = /^\d+$/;

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