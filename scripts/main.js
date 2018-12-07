let runningTotal = 0;
let buffer = '';
let previousOperator = null;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value) {
    switch (value) {
        // clear
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                // need two number to do match
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal + '';
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
            // fundmental operate
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(value);
            break;
    }
}

function handleNumber(value) {
    if (buffer === '0') {
        buffer = value;
    } else {
        buffer += value;
    }
}

function rerender() {
    screen.innerText = buffer;
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleMath(value) {
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = value;

    buffer = '0';
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    });    
}

init();