'use client'
import { useRouter } from 'next/navigation'

const Overrall = () => {
  const router = useRouter()

  // 打印日志辅助调试
  const handleNavigate = (path: string) => {
    console.log(`尝试跳转到: ${path}`)
    router.push(path)
  }

  return (
    <div className="flex min-h-screen">
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部标签 */}
        <div className="bg-pink-200 p-6 text-center text-3xl font-bold">
          小组件
        </div>

        {/* 侧边标签和主内容 */}
        <div className="flex flex-1">
          {/* 侧边标签 - 带调试日志的按钮 */}
          <div className="bg-blue-100 w-30 p-4">
           
            <button 
              onClick={() => handleNavigate('/ImageSwitcher')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              图片切换器
            </button>
            <button 
              onClick={() => handleNavigate('/TaskBoard')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              APi
            </button>
            <button 
              onClick={() => handleNavigate('/Jisuan')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              计数器
            </button>
              <button 
              onClick={() => handleNavigate('/Calculator')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              计算器
            </button>
              <button 
              onClick={() => handleNavigate('/Calendar')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              日历
            </button>
            <button 
              onClick={() => handleNavigate('/Note')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
              读书笔记
            </button>
             <button 
              onClick={() => handleNavigate('/Time')}
              className="w-full my-2 py-2 bg-white border rounded hover:bg-blue-50"
            >
             时钟
            </button>
          </div>

          {/* 主内容区域 - 显示当前路由信息 */}
          <div className="flex-1 p-6 bg-gray-50">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">当前页面: Sleep1</h2>
              <p className="text-gray-600">点击左侧按钮导航到不同功能模块</p>
              <p className="text-gray-500 mt-4">
                提示: 若点击无反应，请检查控制台是否有错误
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overrall



