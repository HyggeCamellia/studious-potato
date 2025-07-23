"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight, 
  faCalendarDay, 
  faPlus, 
  faCircleDot,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

// 日期格式化工具
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 获取月份天数
const getDaysInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

// 获取月份第一天是星期几（0=周日，6=周六）
const getFirstDayOfMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
};

// 判断两个日期是否为同一天
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 月份加减
const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

interface CalendarEvent {
  id: string; // 新增id用于删除功能
  date: string;
  title: string;
  description?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    date: formatDate(new Date()),
    title: '',
    description: ''
  });

  const days = ['日', '一', '二', '三', '四', '五', '六'];
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  // 计算当前月份的日历数据
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayIndex = getFirstDayOfMonth(currentDate);

  // 月份切换处理
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setCurrentDate(addMonths(currentDate, -1));
  };

  // 快速跳转今天
  const jumpToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setNewEvent(prev => ({ ...prev, date: formatDate(today) }));
  };

  // 日期点击处理
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setNewEvent(prev => ({ ...prev, date: formatDate(day) }));
  };

  // 添加日程处理
  const handleAddEvent = () => {
    if (newEvent.date && newEvent.title) {
      // 添加唯一id用于后续删除
      const eventWithId = { ...newEvent, id: Date.now().toString() };
      setEvents(prev => [...prev, eventWithId]);
      // 重置表单
      setNewEvent({
        date: formatDate(selectedDate),
        title: '',
        description: ''
      });
    }
  };

  // 删除日程处理
  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  // 获取指定日期的日程
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const targetDate = formatDate(date);
    return events.filter(event => event.date === targetDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl border border-gray-100">
      {/* 月份标题栏 - 增强视觉层次 */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={jumpToToday}
            className="text-sm px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors flex items-center"
          >
            <FontAwesomeIcon icon={faCalendarDay} className="w-3.5 h-3.5 mr-1" />
            今天
          </button>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={handlePrevMonth}
            aria-label="上一个月"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
          </button>
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={handleNextMonth}
            aria-label="下一个月"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 星期标题行 - 区分周末颜色 */}
      <div className="grid grid-cols-7 gap-1 mb-3">
        {days.map((day, index) => (
          <div 
            key={day} 
            className={`text-center font-medium py-2 px-1 rounded-lg text-sm ${
              index === 0 || index === 6 
                ? 'text-red-600 bg-red-50' 
                : 'text-gray-600 bg-gray-50'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 - 增强交互反馈 */}
      <div className="grid grid-cols-7 gap-1.5 mb-6">
        {/* 填充月初空白 */}
        {Array(firstDayIndex).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="h-28 border border-gray-100 rounded-lg bg-gray-50"></div>
        ))}

        {/* 填充当月日期 */}
        {Array(daysInMonth).fill(0).map((_, i) => {
          const day = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i + 1
          );
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <div 
              key={i} 
              className={`h-28 border rounded-lg p-2 transition-all duration-200 cursor-pointer transform hover:scale-[1.02] ${
                isSelected 
                  ? 'border-blue-400 bg-blue-50 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
              }`}
              onClick={() => handleDayClick(day)}
            >
              {/* 日期数字 - 今天特殊标记 */}
              <div className="flex justify-between items-center mb-1">
                <span className={`text-sm font-medium ${
                  isToday 
                    ? 'text-white bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center' 
                    : 'text-gray-700'
                }`}>
                  {i + 1}
                </span>
                
                {/* 事件指示器 */}
                {hasEvents && (
                  <span className="w-2 h-2 rounded-full bg-blue-500" title="有日程安排"></span>
                )}
              </div>
              
              {/* 事件列表 - 优化显示 */}
              {hasEvents && (
                <div className="text-xs overflow-hidden mt-1 max-h-[50px]">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div 
                      key={event.id} 
                      className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mb-1 truncate hover:bg-blue-200 transition-colors"
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 italic">+{dayEvents.length - 2} 更多</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 添加日程表单 - 美化表单样式 */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <FontAwesomeIcon icon={faPlus} className="w-5 h-5 mr-2 text-blue-500" />
          添加日程
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">日期</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">标题 <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="输入日程标题"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">描述</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="输入日程描述（可选）"
            rows={2}
          />
        </div>
        
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center"
          onClick={handleAddEvent}
          disabled={!newEvent.title}
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
          添加日程
        </button>
      </div>

      {/* 选中日期的日程列表 - 增强视觉体验 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
          <FontAwesomeIcon icon={faCircleDot} className="w-5 h-5 mr-2 text-blue-500" />
          {formatDate(selectedDate)} 的日程
        </h3>
        
        <div className="space-y-2.5">
          {getEventsForDate(selectedDate).map((event) => (
            <div 
              key={event.id} 
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition-all duration-200 hover:border-blue-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1.5">{event.description}</p>
                  )}
                </div>
                
                {/* 操作按钮组 */}
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="删除日程"
                  >
                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* 空状态 - 更友好的提示 */}
          {getEventsForDate(selectedDate).length === 0 && (
            <div className="text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <p className="mb-2">今天没有安排任何日程</p>
              <button
                onClick={() => {
                  // 自动聚焦到标题输入框（需要添加ref实现）
                  setNewEvent(prev => ({ ...prev, date: formatDate(selectedDate) }));
                }}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                点击添加第一个日程
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;