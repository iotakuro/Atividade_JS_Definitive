var divmain = document.getElementById("calculator");

var calculator = document.createElement("div");
calculator.classList.add("calculator");
divmain.appendChild(calculator);

var display = document.createElement("div");
display.classList.add("display");
calculator.appendChild(display);

var result = document.createElement("p");
result.classList.add("result");
display.appendChild(result);

var buttons = [
    { value: "AC", class: "bg-light-gray" },
    { value: "+/-", class: "bg-light-gray" },
    { value: "%", class: "bg-light-gray" },
    { value: "/", class: "bg-orange" },
    { value: "7", class: "bg-gray" },
    { value: "8", class: "bg-gray" },
    { value: "9", class: "bg-gray" },
    { value: "×", class: "bg-orange" },
    { value: "4", class: "bg-gray" },
    { value: "5", class: "bg-gray" },
    { value: "6", class: "bg-gray" },
    { value: "-", class: "bg-orange" },
    { value: "1", class: "bg-gray" },
    { value: "2", class: "bg-gray" },
    { value: "3", class: "bg-gray" },
    { value: "+", class: "bg-orange" },
    { value: "0", class: "button-zero" },
    { value: ".", class: "bg-gray" },
    { value: "=", class: "bg-orange" },
];

var contbutton = document.createElement("div");
contbutton.classList.add("contbutton");
divmain.appendChild(contbutton);

buttons.forEach(function (buttonValue) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = buttonValue.value;
    button.classList.add(buttonValue.class);
    button.onclick = function () {
        buttonClick(buttonValue.value);
    };
    contbutton.appendChild(button);
});

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }

    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        calculate();

        firstOperand = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operator = newOperator;
}

function calculate() {
    if (operator === null || firstOperand === null) return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "×":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null;
    restart = true;
    percentageValue = null;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;

    if (["+", "-"].includes(operator)) {
        result = result * (firstOperand || 1);
    }

    if (result.toString().split(".")[1]?.length > 5) {
        result = result.toFixed(5).toString();
    }

    currentNumber = result.toString();
    updateResult();
}

function buttonClick(buttonText) {
    if (/^[0-9,]+$/.test(buttonText)) {
        addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
        setOperator(buttonText);
    } else if (buttonText === "=") {
        calculate();
    } else if (buttonText === "AC") {
        clearCalculator();
    } else if (buttonText === "+/-") {
        currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
        updateResult();
    } else if (buttonText === "%") {
        setPercentage();
    }
}
