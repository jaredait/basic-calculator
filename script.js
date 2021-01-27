// Note!! The window keyboard event listener doesn't work as expected.
// Due to the event the functions receive as parameter, the keyboard
// event listener should have the whole code duplicated because the event 
// isn't the same. Lesson: don't work with events on the parameters.


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

// Add an eventListener to the +/- key
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

// Add event listeners to the keyboard keys and print its numeric values on the display
window.addEventListener('keydown', printFromKeyboard);


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
function printFromKeyboard(e){
    // print on the display just the numeric keys
    if(parseInt(e.keyCode) >= 96 && parseInt(e.keyCode) <= 105){
        if(clearDisplay){
            display.textContent = '';
            clearDisplay = false;
        }
        display.textContent += e.key;
    }
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
        case '%':
            last /= 100;
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

