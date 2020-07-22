const calc = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calc.displayNumber;
}

function clearClac() {
    calc.displayNumber = '0';
    calc.operator = null;
    calc.firstNumber = null;
    calc.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calc.waitingForSecondNumber && calc.firstNumber === calc.displayNumber) {
        calc.displayNumber = digit;
    } else {
        if (calc.displayNumber === '0') {
            calc.displayNumber = digit;
        } else {
            calc.displayNumber += digit;
        }
    }
}

function inverseNumber() {
    if (calc.displayNumber === '0') {
        return;
    }
    calc.displayNumber = calc.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calc.waitingForSecondNumber) {
        calc.operator = operator;
        calc.waitingForSecondNumber = true;
        calc.firstNumber = calc.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if (calc.firstNumber == null || calc.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if (calc.operator === "+") {
        result = parseInt(calc.firstNumber) + parseInt(calc.displayNumber);
    } else {
        result = parseInt(calc.firstNumber) - parseInt(calc.displayNumber)
    }

    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calc.firstNumber,
        secondNumber: calc.displayNumber,
        operator: calc.operator,
        result: result
    }
    putHistory(history);
    calc.displayNumber = result;
    renderHistory();

}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (even) {
        //mendapat object elemen yang diklik
        const target = even.target;

        if (target.classList.contains('clear')) {
            clearClac();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}