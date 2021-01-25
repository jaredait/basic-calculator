let lastValue = null;
let currentValue = null;
let currentSymbol = null;
let lastSymbol = null;

// Add eventListeners to the number keys
const numberKeys = Array.from(document.getElementsByClassName('number'));
numberKeys.forEach(key => key.addEventListener('click', printOnDisplay));

// Add eventListeners to the symbol keys
const symbolKeys = Array.from(document.getElementsByClassName('symbol'));
symbolKeys.forEach(key => key.addEventListener('click', storeSymbol));

// FUNCTIONS
function printOnDisplay(e){
    let pressedKey = e.target;
    let display = document.getElementById('display');
    display.textContent += pressedKey.dataset.type;
    currentValue = display.textContent;
}
function storeSymbol(e){
    lastSymbol = currentSymbol;
    currentSymbol = e.target.dataset.type;
    if(!lastValue){
        lastValue = currentValue;
        document.querySelector('#display').textContent = '';
    } else{
        var display = document.querySelector('#display');
        lastValue = operate(lastValue, currentValue, lastSymbol);
        display.textContent = '';
        display.textContent = lastValue;
    }
}
function operate(main, sec, symb){
    switch(symb){
        case '+':
            main = +main + +sec;
            break;
        case '-':
            main -= sec;
            break;
        case '*':
            main *= sec;
            break;
        case '/':
            main /= sec;
            break;
    }
    return main;
}
// find out how to acces the data-atributes
// change variable names to lastValue to lastValue and currentValue
