"use client";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faFlag, 
  faClock, 
  faArrowRight, 
  faCheckCircle, 
  faCircle, 
  faHourglassHalf 
} from '@fortawesome/free-solid-svg-icons';

type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
};

type Column = {
  id: 'todo' | 'in-progress' | 'done';
  title: string;
  icon: React.ReactNode;
  color: string;
  tasks: Task[];
};

function TaskBoard() {
  // 状态管理
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: '待处理',
      icon: <FontAwesomeIcon icon={faCircle} className="w-5 h-5" />,
      color: 'bg-blue-500',
      tasks: [
        {
          id: '1',
          title: '设计登录页面',
          description: '创建登录页面的UI设计，包含响应式布局',
          priority: 'high',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: '研究新技术',
          description: '了解React 18的新特性和并发渲染机制',
          priority: 'medium',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'in-progress',
      title: '进行中',
      icon: <FontAwesomeIcon icon={faHourglassHalf} className="w-5 h-5" />,
      color: 'bg-amber-500',
      tasks: [
        {
          id: '3',
          title: 'API集成',
          description: '连接前端和后端API，实现数据交互功能',
          priority: 'high',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'done',
      title: '已完成',
      icon: <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />,
      color: 'bg-green-500',
      tasks: [
        {
          id: '4',
          title: '项目初始化',
          description: '设置项目结构和依赖，配置开发环境',
          priority: 'low',
          createdAt: new Date(),
        },
      ],
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceColumnId: string } | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  // 任务添加逻辑
  const handleAddTask = (columnId: string) => {
    if (!newTask.title.trim()) return;

    const newTaskObj: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      createdAt: new Date(),
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTaskObj] } : col
      )
    );

    setNewTask({ title: '', description: '', priority: 'medium' });
  };

  // 拖拽逻辑
  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, sourceColumnId: columnId });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask || draggedTask.sourceColumnId === targetColumnId) return;

    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        if (col.id === draggedTask.sourceColumnId) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== draggedTask.task.id),
          };
        }
        if (col.id === targetColumnId) {
          return {
            ...col,
            tasks: [...col.tasks, draggedTask.task],
          };
        }
        return col;
      });
    });

    setDraggedTask(null);
    setDragOverColumn(null);
  };

  // 优先级样式辅助函数
  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    const styles = {
      high: {
        border: 'border-l-4 border-red-500',
        badge: 'bg-red-100 text-red-800',
        dot: 'bg-red-500',
        label: '高优先级'
      },
      medium: {
        border: 'border-l-4 border-amber-500',
        badge: 'bg-amber-100 text-amber-800',
        dot: 'bg-amber-500',
        label: '中优先级'
      },
      low: {
        border: 'border-l-4 border-green-500',
        badge: 'bg-green-100 text-green-800',
        dot: 'bg-green-500',
        label: '低优先级'
      }
    };
    return styles[priority];
  };

  // 格式化日期
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 flex items-center">
          <FontAwesomeIcon icon={faFlag} className="w-7 h-7 mr-3 text-blue-600" />
          任务看板
        </h1>

        {/* 添加任务表单 */}
        <div className="mb-8 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5 mr-2 text-blue-500" />
            添加新任务
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">任务标题</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                placeholder="输入任务标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">优先级</label>
              <select
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as 'low' | 'medium' | 'high',
                  })
                }
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none bg-white"
              >
                <option value="low">低</option>
                <option value="medium">中</option>
                <option value="high">高</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => handleAddTask('todo')}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                添加到待处理
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">任务描述</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
              placeholder="输入任务描述（可选）"
              rows={2}
            />
          </div>
        </div>

        {/* 看板主体 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {columns.map((column) => (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(column.id)}
              className={`
                p-4 rounded-xl shadow-sm transition-all duration-300 flex flex-col
                ${dragOverColumn === column.id 
                  ? 'ring-2 ring-dashed ring-blue-500 bg-white/90' 
                  : 'bg-white border border-gray-100'
                }
              `}
            >
              <h2 className="text-lg font-semibold mb-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`${column.color} text-white p-0.5 rounded mr-2`}>
                    {column.icon}
                  </span>
                  <span>{column.title}</span>
                </div>
                <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {column.tasks.length} 任务
                </span>
              </h2>
              
              <div className="space-y-3 flex-1">
                {column.tasks.map((task) => {
                  const priorityStyles = getPriorityColor(task.priority);
                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task, column.id)}
                      className={`
                        p-4 rounded-lg shadow-sm hover:shadow transition-all duration-300 cursor-move
                        ${priorityStyles.border} bg-white hover:translate-y-[-2px]
                        ${draggedTask?.task.id === task.id ? 'opacity-50 scale-95' : ''}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">{task.title}</h3>
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: priorityStyles.dot.split('bg-')[1] }}></span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${priorityStyles.badge}`}>
                            {priorityStyles.label}
                          </span>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{task.description}</p>
                      )}
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span className="flex items-center">
                          <FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5 mr-1" />
                          {formatDate(task.createdAt)}
                        </span>
                        {column.id !== 'done' && (
                          <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500 transition-colors" 
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {column.tasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400 flex flex-col items-center justify-center border border-dashed border-gray-200 rounded-lg bg-gray-50">
                    {column.icon}
                    <p className="mt-3">暂无任务</p>
                    <p className="text-xs mt-1">拖放任务到这里</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TaskBoard;
