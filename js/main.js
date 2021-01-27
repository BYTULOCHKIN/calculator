'use strict()';

// CLASS Calculator
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);

    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;

    const cur = parseFloat(this.currentOperand);
    const prev = parseFloat(this.previousOperand);
    if (isNaN(prev) || isNaN(cur)) return;
    switch (this.operation) {
      case '+':
        computation = prev + cur;
        break;
      case '-':
        computation = prev - cur;
        break;
      case 'x':
        computation = prev * cur;
        break;
      case '÷':
        computation = prev / cur;
        break;
      default:
        return;
    }
    this.currentOperand = computation;

    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

// CONST ELEMENTS

// result block
const previousOperandTextElement = document.querySelector('[data-last]');
const currentOperandTextElement = document.querySelector('[data-current]');

// input block
const clearAllBtn = document.querySelector('[data-clear-all]');
const deleteBtn = document.querySelector('[data-delete]');
const numbersBtns = document.querySelectorAll('[data-number]');
const equalBtn = document.querySelector('[data-equal]');
const operationBtns = document.querySelectorAll('[data-operation]');

// new Calculator const
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbersBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});
clearAllBtn.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
