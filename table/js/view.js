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