"use client"; 
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faClock, faCalendar, faRefresh } from '@fortawesome/free-solid-svg-icons';

function Time() { 
  const [time, setTime] = useState<Date>(new Date());
  const [is12HourFormat, setIs12HourFormat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 处理时间格式切换
  const toggleTimeFormat = () => {
    setIs12HourFormat(!is12HourFormat);
  };

  // 切换明暗模式
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 刷新时间
  const refreshTime = () => {
    setTime(new Date());
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
      weekday: 'long'
    });
  };

  // 获取星期几的图标
  const getWeekdayIcon = () => {
    const day = time.getDay();
    const icons = [
      <span className="text-red-500">日</span>,
      <span>一</span>,
      <span>二</span>,
      <span>三</span>,
      <span>四</span>,
      <span>五</span>,
      <span className="text-blue-500">六</span>
    ];
    return icons[day];
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <div 
        className={`w-full max-w-md rounded-3xl shadow-2xl p-6 md:p-8 transition-all duration-500 transform hover:scale-[1.01] ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 标题区域 */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl md:text-2xl font-bold flex items-center transition-colors duration-300 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            数字时钟
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label={isDarkMode ? "切换到亮色模式" : "切换到暗色模式"}
          >
            {isDarkMode ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </button>
        </div>

        {/* 时间显示区域 */}
        <div className={`
          text-center py-4 rounded-xl mb-6 transition-all duration-500
          ${isDarkMode 
            ? 'bg-gray-900/50' 
            : 'bg-gray-50'
          }
          ${isHovered ? 'shadow-lg' : 'shadow-sm'}
        `}>
          <div className={`text-4xl md:text-6xl font-mono font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {formatTime()}
          </div>
          <div className={`text-sm tracking-wider transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {is12HourFormat ? '12小时制' : '24小时制'}
          </div>
        </div>

        {/* 日期显示区域 */}
        <div className={`
          flex flex-wrap justify-center items-center gap-x-2 gap-y-1 p-3 rounded-xl mb-8 transition-all duration-500
          ${isDarkMode 
            ? 'bg-gray-900/30' 
            : 'bg-gray-50'
          }
        `}>
          <FontAwesomeIcon 
            icon={faCalendar} 
            className={`mr-1 transition-colors duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-500'
            }`} 
          />
          <span className={`text-base md:text-lg transition-colors duration-300 ${
            isDarkMode ? 'text-gray-200' : 'text-gray-700'
          }`}>
            {formatDate().replace(/星期./, `星期${getWeekdayIcon()}`)}
          </span>
        </div>

        {/* 控制按钮区域 */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={toggleTimeFormat}
            className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
            }`}
          >
            <span>{is12HourFormat ? '24小时制' : '12小时制'}</span>
          </button>
          
          <button
            onClick={refreshTime}
            className={`px-3 py-2 rounded-lg flex items-center transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <FontAwesomeIcon icon={faRefresh} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Time;