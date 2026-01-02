// DOM elementlari
        const previousOperandElement = document.getElementById('previousOperand');
        const currentOperandElement = document.getElementById('currentOperand');
        const themeToggleButton = document.getElementById('themeToggle');
        const numberButtons = document.querySelectorAll('[data-number]');
        const operationButtons = document.querySelectorAll('[data-action]');
        
        // Kalkulyator holati
        let currentOperand = '0';
        let previousOperand = '';
        let operation = null;
        let resetCurrentOperand = false;
        
        // Raqam tugmalarini qo'shish
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                appendNumber(button.dataset.number);
                updateDisplay();
            });
        });
        
        // Amallar tugmalari
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                
                switch(action) {
                    case 'add':
                    case 'subtract':
                    case 'multiply':
                    case 'divide':
                        chooseOperation(action);
                        break;
                    case 'equals':
                        compute();
                        break;
                    case 'clear':
                        clear();
                        break;
                    case 'delete':
                        deleteNumber();
                        break;
                    case 'decimal':
                        addDecimal();
                        break;
                }
                
                updateDisplay();
            });
        });
        
        // Raqam qo'shish funksiyasi
        function appendNumber(number) {
            if (currentOperand === '0' || resetCurrentOperand) {
                currentOperand = number;
                resetCurrentOperand = false;
            } else {
                currentOperand += number;
            }
        }
        
        // O'nlik nuqta qo'shish
        function addDecimal() {
            if (resetCurrentOperand) {
                currentOperand = '0.';
                resetCurrentOperand = false;
                return;
            }
            
            if (!currentOperand.includes('.')) {
                currentOperand += '.';
            }
        }
        
        // Amalni tanlash
        function chooseOperation(selectedOperation) {
            if (currentOperand === '') return;
            
            if (previousOperand !== '') {
                compute();
            }
            
            operation = selectedOperation;
            previousOperand = currentOperand;
            resetCurrentOperand = true;
        }
        
        // Hisoblash
        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch(operation) {
                case 'add':
                    computation = prev + current;
                    break;
                case 'subtract':
                    computation = prev - current;
                    break;
                case 'multiply':
                    computation = prev * current;
                    break;
                case 'divide':
                    if (current === 0) {
                        alert("Nolga bo'lish mumkin emas!");
                        clear();
                        return;
                    }
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            // Natijani formatlash
            currentOperand = computation.toString();
            operation = null;
            previousOperand = '';
            resetCurrentOperand = true;
        }
        
        // Ekranni yangilash
        function updateDisplay() {
            currentOperandElement.textContent = currentOperand;
            
            if (operation != null) {
                let operatorSymbol;
                switch(operation) {
                    case 'add': operatorSymbol = '+'; break;
                    case 'subtract': operatorSymbol = '−'; break;
                    case 'multiply': operatorSymbol = '×'; break;
                    case 'divide': operatorSymbol = '÷'; break;
                }
                previousOperandElement.textContent = `${previousOperand} ${operatorSymbol}`;
            } else {
                previousOperandElement.textContent = previousOperand;
            }
        }
        
        // Tozalash
        function clear() {
            currentOperand = '0';
            previousOperand = '';
            operation = null;
        }
        
        // So'nggi raqamni o'chirish
        function deleteNumber() {
            if (currentOperand.length === 1) {
                currentOperand = '0';
            } else {
                currentOperand = currentOperand.slice(0, -1);
            }
        }
        
        // Tema almashish
        themeToggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                themeToggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        
        // Klaviatura yordamida boshqarish
        document.addEventListener('keydown', event => {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
                updateDisplay();
            }
            
            if (event.key === '.') {
                addDecimal();
                updateDisplay();
            }
            
            if (event.key === '+' || event.key === '-') {
                chooseOperation(event.key === '+' ? 'add' : 'subtract');
                updateDisplay();
            }
            
            if (event.key === '*' || event.key === 'x') {
                chooseOperation('multiply');
                updateDisplay();
            }
            
            if (event.key === '/') {
                chooseOperation('divide');
                updateDisplay();
            }
            
            if (event.key === 'Enter' || event.key === '=') {
                compute();
                updateDisplay();
            }
            
            if (event.key === 'Escape') {
                clear();
                updateDisplay();
            }
            
            if (event.key === 'Backspace') {
                deleteNumber();
                updateDisplay();
            }
        });
        
        // Boshlang'ich holat
        updateDisplay();