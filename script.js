let display = document.getElementById('display');
    let currentValue = '0';
    let previousValue = '';
    let operation = null;
    let shouldResetDisplay = false;

    function updateDisplay() {
        display.textContent = currentValue;
    }

    function clearDisplay() {
        currentValue = '0';
        previousValue = '';
        operation = null;
        shouldResetDisplay = false;
        updateDisplay();
    }

    function appendNumber(num) {
        if (shouldResetDisplay) {
            currentValue = num;
            shouldResetDisplay = false;
        } else {
            if (currentValue === '0' && num !== '.') {
                currentValue = num;
            } else if (num === '.' && currentValue.includes('.')) {
                return;
            } else {
                currentValue += num;
            }
        }
        updateDisplay();
    }

    function appendOperator(op) {
        if (op === '⌫') {
            if (currentValue.length > 1) {
                currentValue = currentValue.slice(0, -1);
            } else {
                currentValue = '0';
            }
            updateDisplay();
            return;
        }

        if (op === '√') {
            const num = parseFloat(currentValue);
            if (num < 0) {
                currentValue = 'Xato';
            } else {
                currentValue = Math.sqrt(num).toString();
            }
            shouldResetDisplay = true;
            updateDisplay();
            return;
        }

        if (previousValue !== '' && operation !== null && !shouldResetDisplay) {
            calculate();
        }

        previousValue = currentValue;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operation === null || previousValue === '') {
            return;
        }

        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    currentValue = 'Xato';
                    updateDisplay();
                    previousValue = '';
                    operation = null;
                    shouldResetDisplay = true;
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        currentValue = result.toString();
        operation = null;
        previousValue = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    // Klaviatura tugmalari
    document.addEventListener('keydown', function(e) {
        if (e.key >= '0' && e.key <= '9') {
            appendNumber(e.key);
        } else if (e.key === '.') {
            appendNumber('.');
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            appendOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            clearDisplay();
        } else if (e.key === 'Backspace') {
            appendOperator('⌫');
        }
    });