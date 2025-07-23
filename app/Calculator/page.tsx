"use client"
import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operator, setOperator] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  // 处理数字点击
  const handleNumberClick = (number: string) => {
    // 计算后输入新数字重置状态
    if (isCalculated) {
      setCurrentValue(number === '.' ? '0.' : number);
      setDisplay(number === '.' ? '0.' : number);
      setIsCalculated(false);
      return;
    }

    // 避免多个0和多个小数点
    if (currentValue === '0' && number === '0') return;
    if (currentValue.includes('.') && number === '.') return;

    // 处理小数点开头的情况
    if (currentValue === '' && number === '.') {
      setCurrentValue('0.');
      setDisplay('0.');
      return;
    }

    // 更新当前值和显示
    setCurrentValue(prev => prev + number);
    setDisplay(prev => (prev === '0' && number !== '.' ? number : prev + number));
  };

  // 处理运算符点击
  const handleOperatorClick = (op: string) => {
    if (currentValue === '') return;

    // 如果已有前值和运算符，先计算
    if (previousValue !== '' && operator !== '') {
      calculate();
    }

    setOperator(op);
    setPreviousValue(currentValue);
    setCurrentValue('');
    setIsCalculated(false);
  };

  // 计算结果
  const calculate = () => {
    if (previousValue === '' || currentValue === '' || operator === '') return;

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

    // 处理大数显示
    const resultString = result.toString().length > 10 
      ? result.toFixed(6) 
      : result.toString();
    
    setDisplay(resultString);
    setPreviousValue(resultString);
    setCurrentValue('');
    setOperator('');
    setIsCalculated(true);
  };

  // 清除功能
  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
    setIsCalculated(false);
  };

  // 退格功能
  const handleBackspace = () => {
    if (currentValue === '' || isCalculated) {
      setDisplay('0');
      setCurrentValue('');
      return;
    }
    
    const newValue = currentValue.slice(0, -1);
    setCurrentValue(newValue);
    setDisplay(newValue || '0');
  };

  return (
    <div className="max-w-xs mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
      {/* 计算器标题 */}
      <div className="px-6 py-4 bg-gray-900/50 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-white font-semibold text-lg tracking-wide">智能计算器</h2>
        <span className="text-gray-400 text-xs">v1.0</span>
      </div>

      {/* 显示区域 */}
      <div className="p-6 bg-gray-900/80">
        <div className="h-24 flex items-end justify-end mb-4 overflow-hidden">
          <div className="text-right">
            {/* 历史记录显示 */}
            {previousValue && (
              <div className="text-gray-400 text-sm mb-1">
                {previousValue} {operator || ''}
              </div>
            )}
            {/* 当前值显示 */}
            <div className="text-white text-4xl md:text-5xl font-light tracking-tight">
              {display}
            </div>
          </div>
        </div>
      </div>

      {/* 按钮区域 */}
      <div className="p-4 grid grid-cols-4 gap-3 bg-gray-900">
        {/* 第一行按钮 */}
        <button
          onClick={handleClear}
          className="bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
        >
          C
        </button>
        <button
          onClick={handleBackspace}
          className="bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          ←
        </button>
        <button
          onClick={() => handleOperatorClick('/')}
          className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20"
        >
          ÷
        </button>
        <button
          onClick={() => handleOperatorClick('*')}
          className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20"
        >
          ×
        </button>

        {/* 第二行按钮 */}
        <button
          onClick={() => handleNumberClick('7')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          7
        </button>
        <button
          onClick={() => handleNumberClick('8')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          8
        </button>
        <button
          onClick={() => handleNumberClick('9')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          9
        </button>
        <button
          onClick={() => handleOperatorClick('-')}
          className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20"
        >
          −
        </button>

        {/* 第三行按钮 */}
        <button
          onClick={() => handleNumberClick('4')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          4
        </button>
        <button
          onClick={() => handleNumberClick('5')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          5
        </button>
        <button
          onClick={() => handleNumberClick('6')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          6
        </button>
        <button
          onClick={() => handleOperatorClick('+')}
          className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-900/20"
        >
          +
        </button>

        {/* 第四行按钮 */}
        <button
          onClick={() => handleNumberClick('1')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          1
        </button>
        <button
          onClick={() => handleNumberClick('2')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          2
        </button>
        <button
          onClick={() => handleNumberClick('3')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          3
        </button>
        <button
          onClick={calculate}
          className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/30 col-span-2"
        >
          =
        </button>

        {/* 第五行按钮 */}
        <button
          onClick={() => handleNumberClick('0')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 col-span-2"
        >
          0
        </button>
        <button
          onClick={() => handleNumberClick('.')}
          className="bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-xl py-4 font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          .
        </button>
      </div>

      {/* 底部信息 */}
      <div className="px-4 py-2 bg-gray-900 text-center">
        <p className="text-gray-500 text-xs">支持键盘输入 (←删除)</p>
      </div>
    </div>
  );
};

export default Calculator;