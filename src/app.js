const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');

let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'C') {
            currentInput = '';
            operator = '';
            firstOperand = null;
            updateDisplay();
        } else if (value === 'CE') {
            currentInput = '';
            updateDisplay();
        } else if (value === '=') {
            if (firstOperand !== null && operator) {
                currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
                operator = '';
                firstOperand = null;
                updateDisplay();
            }
        } else if (['+', '-', '*', '/', '^', '√'].includes(value)) {
            if (currentInput) {
                if (value === '√') {
                    currentInput = calculate(null, parseFloat(currentInput), value).toString();
                    updateDisplay();
                } else {
                    firstOperand = parseFloat(currentInput);
                    operator = value;
                    currentInput = '';
                }
            }
        } else {
            currentInput += value;
            updateDisplay();
        }
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '^':
            return Math.pow(a, b);
        case '√':
            return Math.sqrt(b);
        default:
            return b;
    }
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}