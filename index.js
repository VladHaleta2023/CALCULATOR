const result = document.getElementById("res");

function clearAll() {
    try {
        result.value = "";
    }
    catch {

    }
}

function deleteLastSymbol() {
    try {
        result.value = result.value.slice(0, -1);
    }
    catch {

    }
}

function percent() {
    try {
        getResult();
        value = String(parseFloat(String(result.value).replace(/,/g, ".")) / 100).replace('.', ',');
        if (value != "NaN")
            result.value = value;
        else
            result.value = "";
    }
    catch {

    }
}

function printDelete() {
    try {
        if (result.value[result.value.length-1] != '/' &&
            result.value[result.value.length-1] != '*' &&
            result.value[result.value.length-1] != 'x' &&
            result.value[result.value.length-1] != '+' &&
            result.value[result.value.length-1] != '-') {
            result.value += "/";
        }
        else {
            result.value = result.value.substring(0, result.value.length-1) + "/"
        }
    }
    catch {

    }
}

function printMultiply() {
    try {
        if (result.value[result.value.length-1] != '/' &&
            result.value[result.value.length-1] != '*' &&
            result.value[result.value.length-1] != 'x' &&
            result.value[result.value.length-1] != '+' &&
            result.value[result.value.length-1] != '-') {
            result.value += "x";
        }
        else {
            result.value = result.value.substring(0, result.value.length-1) + "x"
        }
    }
    catch {

    }
}

function printMinus() {
    try {
        if (result.value[result.value.length-1] != '/' &&
            result.value[result.value.length-1] != '*' &&
            result.value[result.value.length-1] != 'x' &&
            result.value[result.value.length-1] != '+' &&
            result.value[result.value.length-1] != '-') {
            result.value += "-";
        }
        else {
            result.value = result.value.substring(0, result.value.length-1) + "-"
        }
    }
    catch {

    }
}

function printPlus() {
    try {
        if (result.value[result.value.length-1] != '/' &&
            result.value[result.value.length-1] != '*' &&
            result.value[result.value.length-1] != 'x' &&
            result.value[result.value.length-1] != '+' &&
            result.value[result.value.length-1] != '-') {
            result.value += "+";
        }
        else {
            result.value = result.value.substring(0, result.value.length-1) + "+"
        }
    }
    catch {

    }
}

function printOne() {
    try {
        result.value += "1";
    }
    catch {

    }
}

function printTwo() {
    try {
        result.value += "2";
    }
    catch {

    }
}

function printThree() {
    try {
        result.value += "3";
    }
    catch {

    }
}

function printFour() {
    try {
        result.value += "4";
    }
    catch {

    }
}

function printFive() {
    try {
        result.value += "5";
    }
    catch {

    }
}

function printSix() {
    try {
        result.value += "6";
    }
    catch {

    }
}

function printSeven() {
    try {
        result.value += "7";
    }
    catch {

    }
}

function printEight() {
    try {
        result.value += "8";
    }
    catch {

    }
}

function printNine() {
    try {
        result.value += "9";
    }
    catch {

    }
}

function printZero() {
    try {
        result.value += "0";
    }
    catch {

    }
}

function printPoint() {
    try {
        result.value += ",";
    }
    catch {

    }
}

function printPi() {
    try {
        result.value += "3,14159265";
    }
    catch {

    }
}

function getMathArray(input) {
    let array = []

    if (input[0] != '-' && input[0] != '+')
        input = '+' + input;

    try {
        let index = 0;
        let change = false;
        let value = "";

        for (let i = 0; i < input.length; i++) {
            if (input[i] != '-' && input[i] != '+' && input[i] != '/' && input[i] != 'x' && input[i] != '*') {
                change = true;
                value += input[i];
            }
            else {
                if (change) {
                    array[index] = [array[index][0], value];
                    value = "";
                    index += 1;
                }
                if (input[i] != 'x')
                    array[index] = [input[i], ''];
                else
                    array[index] = ['*', ''];
                change = false;
            }
        }

        if (value != "")
            array[array.length - 1][1] = value;

        return [['+', 0]].concat(array);
    }
    catch {
        return [];
    }
}

function multiplyDivision(array) {
    let changed = false;

    for (let i = 0; i < array.length; i++) {
        if (i == 0)
            continue;
        if (array[i][0] == '*') {
            array[i-1][1] = parseFloat(array[i-1][1]) * parseFloat(array[i][1]);
            array.splice(i, 1);
            changed = true;
            break;
        }
        if (array[i][0] == '/') {
            array[i-1][1] = parseFloat(array[i-1][1]) / parseFloat(array[i][1]);
            array.splice(i, 1);
            changed = true;
            break;
        }
    }

    return [changed, array];
}

function plusMinus(array) {
    let changed = false;

    for (let i = 0; i < array.length; i++) {
        if (i == 0)
            continue;
        if (array[i][0] == '+') {
            array[i-1][1] = parseFloat(array[i-1][1]) + parseFloat(array[i][1]);
            array.splice(i, 1);
            changed = true;
            break;
        }
        if (array[i][0] == '-') {
            array[i-1][1] = parseFloat(array[i-1][1]) - parseFloat(array[i][1]);
            array.splice(i, 1);
            changed = true;
            break;
        }
    }

    return [changed, array];
}

function firstOperations(mathResult) {
    let changed = true;

    while (changed) {
        let result = multiplyDivision(mathResult);
        changed = result[0];
        mathResult = result[1];
    }

    return mathResult;
}

function secondOperations(mathResult) {
    let changed = true;

    while (changed) {
        let result = plusMinus(mathResult);
        changed = result[0];
        mathResult = result[1];
    }

    return mathResult;
}

function getResult() {
    try {
        const input = String(result.value).replace(/,/g, '.');
        let mathResult = getMathArray(input);

        mathResult = firstOperations(mathResult);
        mathResult = secondOperations(mathResult);

        if (mathResult.length == 1) {
            if (mathResult[0][0] == '-') {
                result.value = String(mathResult[0][0]) + String(mathResult[0][1]);
            }
            else {
                result.value = String(mathResult[0][1]);
            }
        }
        else {
            result.value = "";
        }
    }
    catch {
        result.value = "";
    }
}