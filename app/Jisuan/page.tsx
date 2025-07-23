"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faRefresh } from '@fortawesome/free-solid-svg-icons';

const Jisuan: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    // 增加计数
    const increment = () => {
        setIsAnimating(true);
        setCount(prev => prev + 1);
        setTimeout(() => setIsAnimating(false), 300);
    };

    // 减少计数（带最小值限制）
    const decrement = () => {
        if (count > 0) {
            setIsAnimating(true);
            setCount(prev => prev - 1);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    // 重置计数
    const reset = () => {
        setIsAnimating(true);
        setCount(0);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <div className="max-w-xs mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* 标题区域 */}
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <h2 className="text-xl font-bold flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    计数器
                </h2>
                <p className="text-blue-100 text-sm mt-1">简单的计数工具</p>
            </div>

            {/* 计数显示区域 */}
            <div className="p-8 flex flex-col items-center justify-center">
                <div className={`
                    text-6xl font-bold mb-8 w-32 h-32 rounded-full 
                    flex items-center justify-center transition-all duration-300
                    ${isAnimating 
                        ? 'scale-110 shadow-lg bg-blue-100 text-blue-600' 
                        : 'bg-gray-50 text-gray-800 border border-gray-200'
                    }
                `}>
                    {count}
                </div>

                {/* 按钮区域 */}
                <div className="flex justify-center space-x-4 w-full">
                    <button
                        onClick={decrement}
                        disabled={count === 0}
                        className={`
                            px-6 py-3 rounded-full transition-all duration-200 flex-1
                            ${count === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600 text-white hover:shadow-md active:scale-95'
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={faMinus} className="mr-2" />
                        减少
                    </button>

                    <button
                        onClick={reset}
                        disabled={count === 0}
                        className={`
                            px-4 py-3 rounded-full transition-all duration-200
                            ${count === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-500 hover:bg-gray-600 text-white hover:shadow-md active:scale-95'
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={faRefresh} />
                    </button>

                    <button
                        onClick={increment}
                        className="
                            px-6 py-3 rounded-full transition-all duration-200 flex-1
                            bg-green-500 hover:bg-green-600 text-white hover:shadow-md active:scale-95
                        "
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        增加
                    </button>
                </div>
            </div>

            {/* 底部信息 */}
            <div className="px-4 py-3 bg-gray-50 text-center text-gray-500 text-sm border-t border-gray-100">
                点击按钮进行计数操作
            </div>
        </div>
    );
};

export default Jisuan;