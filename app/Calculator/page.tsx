"use client"
import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (number: string) => {
    if (currentValue === '0' && number === '0') return;

    if (currentValue.includes('.') && number === '.') return;

    if (currentValue === '' && number === '.') {
      setCurrentValue('0.');
      setDisplay('0.');
      return;
    }

    setCurrentValue((prev) => prev + number);
    setDisplay((prev) => (prev === '0' ? number : prev + number));
  };

  const handleOperatorClick = (op: string) => {
    if (currentValue === '') return;

    if (previousValue !== '' && operator !== '') {
      calculate();
    }

    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue('');
  };

  const calculate = () => {
    if (previousValue === '' || currentValue === '') return;

    const prev = parseFloat(previousValue);
    const curr = parseFloat(currentValue);
    let result: number;

    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        if (curr === 0) {
          setDisplay('错误');
          setPreviousValue('');
          setCurrentValue('');
          setOperator('');
          return;
        }
        result = prev / curr;
        break;
      default:
        return;
    }

    const resultString = result.toString();
    setDisplay(resultString);
    setPreviousValue(resultString);
    setCurrentValue('');
    setOperator('');
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
  };

  const handleEquals = () => {
    if (previousValue === '' || currentValue === '' || operator === '') return;
    calculate();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">计算器</h2>
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl font-mono h-12 overflow-x-auto">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          C
        </button>
        <button
          onClick={() => handleOperatorClick('/')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperatorClick('*')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          ×
        </button>
        <button
          onClick={() => handleOperatorClick('-')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          -
        </button>
        <button
          onClick={() => handleNumberClick('7')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          7
        </button>
        <button
          onClick={() => handleNumberClick('8')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          8
        </button>
        <button
          onClick={() => handleNumberClick('9')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          9
        </button>
        <button
          onClick={() => handleOperatorClick('+')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          +
        </button>
        <button
          onClick={() => handleNumberClick('4')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          4
        </button>
        <button
          onClick={() => handleNumberClick('5')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          5
        </button>
        <button
          onClick={() => handleNumberClick('6')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          6
        </button>
        <button
          onClick={handleEquals}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 col-span-2"
        >
          =
        </button>
        <button
          onClick={() => handleNumberClick('1')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          1
        </button>
        <button
          onClick={() => handleNumberClick('2')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          2
        </button>
        <button
          onClick={() => handleNumberClick('3')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          3
        </button>
        <button
          onClick={() => handleNumberClick('0')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 col-span-2"
        >
          0
        </button>
        <button
          onClick={() => handleNumberClick('.')}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;