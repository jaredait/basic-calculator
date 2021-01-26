let lastValue = null;
let currentValue = null;
let currentSymbol = null;
let lastSymbol = null;
const display = document.querySelector('#display');
let clearDisplay = false;

// Add eventListeners to the number keys
const numberKeys = Array.from(document.getElementsByClassName('number'));
numberKeys.forEach(key => key.addEventListener('click', printOnDisplay));

// Add eventListeners to the symbol keys
const symbolKeys = Array.from(document.getElementsByClassName('symbol'));
symbolKeys.forEach(key => key.addEventListener('click', storeSymbol));

// Add event listeners to the clear keys
const clearKeys = Array.from(document.querySelectorAll('.clear'));
clearKeys.forEach(key => key.addEventListener('click', clear));

// Add an eventListener to the point key
const pointKey = document.querySelector('div[data-type="."]');
pointKey.addEventListener('click', () =>{
    if(!display.textContent.includes('.')) display.textContent += '.';
});

const switchSignKey = document.querySelector('div[data-type="!"]');
switchSignKey.addEventListener('click', () =>{
    let operand = display.textContent;
    if(operand){
        if(parseInt(operand) > 0){
            display.textContent = '-' + operand;
        }
        else{
            if(operand != 0){
                display.textContent = operand.slice(1);
            }
        }
    }
});

// FUNCTIONS
function printOnDisplay(e){
    if(clearDisplay){
        display.textContent = '';
        clearDisplay = false;
    }
    let pressedKey = e.target;
    display.textContent += pressedKey.dataset.type;
    currentValue = display.textContent;
}
function storeSymbol(e){
    if(lastValue){
        lastSymbol = currentSymbol;
        currentSymbol = e.target.dataset.type;
        lastValue = operate(lastValue, currentValue, lastSymbol)
        display.textContent = '';
        display.textContent = lastValue;
        clearDisplay = true;
    } else{
        // Store the last number in lastValue
        lastValue = display.textContent;
        currentSymbol = e.target.dataset.type;
        clearDisplay = true;   
    }
    
}
function operate(last, current, symb){
    switch(symb){
        case '+':
            last = +last + +current;
            break;
        case '-':
            last -= current;
            break;
        case '*':
            last *= current;
            break;
        case '/':
            current == 0 ? last = 'error' : last /= current;
            break;
    }
    return last;
}
function clear(e){
    clearKey = e.target;
    display.textContent = '';
    if(clearKey.dataset.type === 'CE'){
        lastValue = null;
        lastSymbol = null;
        currentValue = null;
        currentSymbol = null;
    }
}
// find out how to acces the data-atributes
// change variable names to lastValue to lastValue and currentValue
