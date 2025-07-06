"use client"; 
import { useState, useEffect } from 'react';

function Time() { 
  const [time, setTime] = useState<Date>(new Date());
  const [is12HourFormat, setIs12HourFormat] = useState(false);

  // 处理时间格式切换
  const toggleTimeFormat = () => {
    setIs12HourFormat(!is12HourFormat);
  };

  // 副作用：设置定时器
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 清除副作用
    return () => clearInterval(timerId);
  }, []);

  // 格式化时间显示
  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour12: is12HourFormat,
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 格式化日期显示
  const formatDate = () => {
    return time.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">数字时钟</h1>
          
          <div className="text-6xl font-mono text-gray-800">
            {formatTime()}
          </div>

          <div className="text-xl text-gray-600">
            {formatDate()}
          </div>

          <button
            onClick={toggleTimeFormat}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                     transition-all duration-300 transform hover:scale-105"
          >
            切换 {is12HourFormat ? '24小时制' : '12小时制'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Time