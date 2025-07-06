"use client"
import React, { useState } from 'react';

const Jisuan: React.FC = () => {  // 修正组件类型定义语法
    const [count, setCount] = useState<number>(0);

    // 增加计数（优化为函数式更新）
    const increment = () => {
        setCount(prev => prev + 1);
    };

    // 减少计数（带最小值限制）
    const decrement = () => {
        setCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="p-4 bg-gray-100 rounded-md text-center shadow-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800">计数器</h2>
            <p className="text-lg mb-4 text-gray-600">当前计数: {count}</p>
            <div className="flex justify-center space-x-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md 
                             hover:bg-blue-600 transition-colors duration-200"
                    onClick={increment}
                >
                    增加
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md 
                             hover:bg-red-600 transition-colors duration-200"
                    onClick={decrement}
                >
                    减少
                </button>
            </div>
        </div>
    );
};

export default Jisuan;  