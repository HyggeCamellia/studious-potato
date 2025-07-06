"use client";
import { useState } from 'react';

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
  tasks: Task[];
};

function TaskBoard() {
  // 状态管理
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: '待处理',
      tasks: [
        {
          id: '1',
          title: '设计登录页面',
          description: '创建登录页面的UI设计',
          priority: 'high',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: '研究新技术',
          description: '了解React 18的新特性',
          priority: 'medium',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'in-progress',
      title: '进行中',
      tasks: [
        {
          id: '3',
          title: 'API集成',
          description: '连接前端和后端API',
          priority: 'high',
          createdAt: new Date(),
        },
      ],
    },
    {
      id: 'done',
      title: '已完成',
      tasks: [
        {
          id: '4',
          title: '项目初始化',
          description: '设置项目结构和依赖',
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

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
  };

  // 优先级样式辅助函数
  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    const colorMap = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    return colorMap[priority] || 'bg-gray-100 text-gray-800';
  };

  // 组件渲染
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">任务看板</h1>

      {/* 添加任务表单 */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">添加新任务</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">任务标题</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="输入任务标题"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  priority: e.target.value as 'low' | 'medium' | 'high',
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">低</option>
              <option value="medium">中</option>
              <option value="high">高</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => handleAddTask('todo')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              添加到待处理
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">任务描述</label>
          <textarea
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="输入任务描述"
            rows={2}
          />
        </div>
      </div>

      {/* 看板主体 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            className="bg-gray-100 p-4 rounded-lg shadow"
          >
            <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
              <span>{column.title}</span>
              <span className="text-sm font-normal bg-gray-200 px-2 py-1 rounded-full">
                {column.tasks.length} 任务
              </span>
            </h2>
            <div className="space-y-4">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${getPriorityColor(
                    task.priority
                  )} hover:shadow-md transition-shadow cursor-move`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>创建于: {task.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              {column.tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">暂无任务</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default TaskBoard;