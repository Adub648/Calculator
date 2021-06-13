// defining initial values
let operator = null;
let num1 = null;
let num2 = null;
let checkDecimal = /([.])/;
const screen = document.getElementById("calc");
let screenVal = "";
let calculation = "";
let numString = "";
let screenReset = null;

// finding html elements
const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const decimalBtn = document.querySelector("[data-decimal]");
const equalsBtn = document.querySelector("[data-equals]");
const percentageBtn = document.querySelector("[data-percentage]");

// assigning event listeners to html elements
numberBtns.forEach((button) =>
    button.addEventListener("click", () => screenNumbers(button.textContent))
);

operatorBtns.forEach((button) =>
    button.addEventListener("click", () => screenOperators(button.textContent))
);

clearBtn.addEventListener("click", () => clearPage());

decimalBtn.addEventListener("click", () => appendDecimal());

equalsBtn.addEventListener("click", () => calculate());

deleteBtn.addEventListener("click", () => deleteChar());

percentageBtn.addEventListener("click", () => addPercent());

document.addEventListener("keydown", () => keyboardAssign(event));

// event to convert keystrokes to input
function keyboardAssign(event) {
    console.log(event.key);
    switch (event.key) {
        case "0":
            screenNumbers(0);
            break;
        case "1":
            screenNumbers(1);
            break;
        case "2":
            screenNumbers(2);
            break;
        case "3":
            screenNumbers(3);
            break;
        case "4":
            screenNumbers(4);
            break;
        case "5":
            screenNumbers(5);
            break;
        case "6":
            screenNumbers(6);
            break;
        case "7":
            screenNumbers(7);
            break;
        case "8":
            screenNumbers(8);
            break;
        case "9":
            screenNumbers(9);
            break;
        case "Escape":
            clearPage();
            break;
        case "Backspace":
            deleteChar();
            break;
        case ".":
            appendDecimal();
            break;
        case "%":
            addPercent();
            break;
        case "Enter":
            calculate();
            break;
        case "+":
            screenOperators("+");
            break;
        case "-":
            screenOperators("-");
            break;
        case "/":
            screenOperators("/");
            break;
        case "*":
            screenOperators("*");
            break;
    }
}

// display numbers on screen
function screenNumbers(num) {
    if (screen.innerHTML.length >= 15 ) {
        return;
    } else if (screenReset == null) {
        screen.innerHTML += num;
    } else {
        screen.innerHTML = num;
        screenReset = null;
    }
}

// add decimal point
function appendDecimal() {
    if (checkDecimal.exec(screen.innerHTML)) {
        return;
    }
    if (screen.innerHTML == "") {
        screen.innerHTML = "0.";
    } else if (operator != null) {
        return;
    } else {
        screen.innerHTML += ".";
    }
}

// convert to percentage
function addPercent() {
    if (screen.innerHTML == "") {
        return;
    } else if (operator != null) {
        return;
    }
    screen.innerHTML = parseInt(screen.innerHTML) / 100;
    document.getElementById("%").className = "inputBtn selected";
}

// clear screen
function clearPage() {
    num1 = null;
    num2 = null;
    operator = null;
    screenReset = null;
    screen.innerHTML = "";
    decimalExists = false;
    calculated = false;
    screenVal = "";
    screenReset = null;
    calculation = null;
}

// delete rightmost character
function deleteChar() {
    displayString = document.getElementById("calc").innerText;
    numString = displayString.slice(0, -1);
    screen.innerText = numString;
    if (screenReset == true) {
        clearPage();
    }
}

// check the operator when entered
function screenOperators(num) {
    // if no number has been entered
    if (screen.innerHTML == "") {
        return;
    // if operator already used
    } else if (operator != null) {
        calculate();
        operator = num;
        screenReset = true;
    } else {
        num1 = screen.innerHTML;
        switch (num) {
            case "+":
                screen.innerHTML = "+";
                break;
            case "-":
                screen.innerHTML = "-";
                break;
            case "*":
                screen.innerHTML = "*";
                break;
            case "/":
                screen.innerHTML = "/";
                break;
        }
        operator = num;
        screenReset = true;
        document.getElementById(screen.innerHTML).className = "inputBtn selected";
    }
}

// perform calculation
function calculate() {
    // if nothing has been entered
    if (operator == null && num1 == null && num2 == null) {
        return;
    // if operator has been entered
    } else if (screenReset == true) {
        return;
    // if only num1 present
    } else if (operator == null && num2 == null) {
        return;
    }
    document.getElementById(operator).className = "inputBtn";
    document.getElementById("%").className = "inputBtn";
    // assign num2 if haven't done already
    if (num2 == null) {
        num2 = screen.innerHTML;
    }
    // prevent user dividing by zero
    if (operator == "/" && num2 == "0") {
        alert("You can't divide by zero!");
        clearPage();
        return;
    }
    num1 = Number(num1);
    num2 = Number(num2);
    operate();
}

// perform calculation
function operate() {
    // perform actual calculation
    switch (operator) {
        case "+":
            calculation = add(num1, num2);
            break;
        case "-":
            calculation = subtract(num1, num2);
            break;
        case "*":
            calculation = multiply(num1, num2);
            break;
        case "/":
            calculation = divide(num1, num2);
            break;
    }
    
    // round to two decimal places
    if (countDecimals(calculation) >= 3) {
        calculation = calculation.toFixed(2);
    }

    // reset calcuation variables
    screenReset = null;
    operator = null;
    num1 = calculation;
    num2 = null;
    screen.innerHTML = calculation;
}

// calculate number of decimals present
function countDecimals(num) {
    let text = num.toString();
    let index = text.indexOf(".");
    return index == -1 ? 0 : text.length - index - 1;
}

// addition
function add(num1, num2) {
    return num1 + num2;
}

// subtraction
function subtract(num1, num2) {
    return num1 - num2;
}

// multiplication
function multiply(num1, num2) {
    return num1 * num2;
}

// division
function divide(num1, num2) {
    return num1 / num2;
}
