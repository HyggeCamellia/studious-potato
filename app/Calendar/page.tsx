"use client"
import React, { useState, useEffect } from 'react';

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 工具函数：获取月份天数
const getDaysInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

// 工具函数：获取月份第一天是星期几（0=周日，6=周六）
const getFirstDayOfMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
};

// 工具函数：判断两个日期是否为同一天
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// 工具函数：月份加减
const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

interface CalendarEvent {
  date: string;
  title: string;
  description?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
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

  // 日期点击处理
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setNewEvent(prev => ({ ...prev, date: formatDate(day) }));
  };

  // 添加日程处理
  const handleAddEvent = () => {
    if (newEvent.date && newEvent.title) {
      setEvents(prev => [...prev, newEvent]);
      setNewEvent({
        date: formatDate(selectedDate),
        title: '',
        description: ''
      });
    }
  };

  // 获取指定日期的日程
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const targetDate = formatDate(date);
    return events.filter(event => event.date === targetDate);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
      {/* 月份标题栏 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg transition-colors duration-200"
            onClick={handlePrevMonth}
            aria-label="上一个月"
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded-lg transition-colors duration-200"
            onClick={handleNextMonth}
            aria-label="下一个月"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* 星期标题行 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(day => (
          <div key={day} className="text-center font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 填充月初空白 */}
        {Array(firstDayIndex).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="h-24 border border-gray-100 rounded-lg bg-gray-50"></div>
        ))}

        {/* 填充当月日期 */}
        {Array(daysInMonth).fill(0).map((_, i) => {
          const day = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i + 1
          );
          const isSelected = isSameDay(day, selectedDate);
          const dayEvents = getEventsForDate(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <div 
              key={i} 
              className={`h-24 border rounded-lg p-1 transition-colors duration-150 ${
                isSelected 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => handleDayClick(day)}
            >
              <div className="text-sm font-medium text-gray-700 mb-1">{i + 1}</div>
              
              {hasEvents && (
                <div className="text-xs overflow-hidden">
                  {dayEvents.slice(0, 2).map((event, idx) => (
                    <div 
                      key={idx} 
                      className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded mb-1 truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500">+{dayEvents.length - 2} 更多</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 添加日程表单 */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">添加日程</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入日程标题"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入日程描述"
            rows={2}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          onClick={handleAddEvent}
        >
          添加日程
        </button>
      </div>

      {/* 选中日期的日程列表 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          今日日程 ({formatDate(selectedDate)})
        </h3>
        <div className="space-y-2">
          {getEventsForDate(selectedDate).map((event, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">{event.title}</h4>
                <span className="text-xs text-gray-500">
                  <i className="fa fa-calendar-o mr-1"></i>{event.date}
                </span>
              </div>
              {event.description && (
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              )}
            </div>
          ))}
          {getEventsForDate(selectedDate).length === 0 && (
            <div className="text-gray-500 text-center py-4">今日没有日程安排</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;