'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const Overrall = () => {
  const router = useRouter()
  const [activePath, setActivePath] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  
  // 监听路由变化，高亮当前选中项
  useEffect(() => {
    // 初始设置当前路径
    setActivePath(window.location.pathname || '/Sleep1')
    
    // 监听滚动事件
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // 移除router依赖，避免不必要的重渲染

  // 监听路由变化的效果
  useEffect(() => {
    const handleRouteChange = () => {
      setActivePath(window.location.pathname || '/Sleep1')
    }
    
    // 监听popstate事件（前进/后退按钮）
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  // 导航处理函数
  const handleNavigate = (path: string) => {
    console.log(`尝试跳转到: ${path}`)
    router.push(path)
    // 立即更新activePath以获得即时反馈
    setActivePath(path)
  }

  // 导航项数据
  const navItems = [
    { path: '/ImageSwitcher', name: '图片切换器', icon: '🖼️' },
    { path: '/TaskBoard', name: 'API', icon: '🔌' },
    { path: '/Jisuan', name: '计数器', icon: '🔢' },
    { path: '/Calculator', name: '计算器', icon: '🧮' },
    { path: '/Calendar', name: '日历', icon: '📅' },
    { path: '/Note', name: '读书笔记', icon: '📝' },
    { path: '/Time', name: '时钟', icon: '⏰' },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* 主内容区域 */}
      <div className="flex-1 flex flex-col shadow-xl rounded-xl overflow-hidden max-w-7xl w-full mx-auto my-6 transition-all duration-300">
        {/* 顶部标签 - 带滚动效果 */}
        <div className={`relative overflow-hidden transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-lg' : 'py-6 shadow-md'
        } bg-gradient-to-r from-rose-500 to-violet-600 text-white`}>
          <div className="absolute inset-0 bg-[url('https://picsum.photos/id/1048/1200/200')] opacity-10 bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/90 to-violet-600/90"></div>
          
          <div className="relative z-10 text-center px-4">
            <h1 className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-2xl' : 'text-3xl'
            }`}>
              <span className="inline-block transform hover:scale-105 transition-transform">✨</span>
              小组件集合
              <span className="inline-block transform hover:scale-105 transition-transform">✨</span>
            </h1>
          </div>
        </div>

        {/* 侧边标签和主内容 */}
        <div className="flex flex-1">
          {/* 侧边标签 - 带调试日志的按钮 */}
          <div className="bg-white w-56 p-5 shadow-md border-r border-slate-100 transition-all duration-300 hover:shadow-lg">
            <div className="mb-6">
              <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-3 pl-3">功能导航</h3>
              <div className="space-y-1.5">
                {navItems.map((item) => (
                  <button 
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full py-3 px-4 rounded-lg text-left transition-all duration-300 flex items-center space-x-3 group ${
                      activePath === item.path 
                        ? 'bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 font-medium shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                    {activePath === item.path && (
                      <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 transition-all group-hover:scale-150 group-hover:shadow-md"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 侧边栏底部装饰 */}
            <div className="mt-auto pt-6 border-t border-slate-100">
              <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-4 rounded-xl">
                <p className="text-sm text-slate-600">
                  <span className="text-rose-500">💡</span> 选择左侧功能开始使用
                </p>
              </div>
            </div>
          </div>

          {/* 主内容区域 - 显示当前路由信息 */}
          <div className="flex-1 p-8 bg-slate-50">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transform transition-all duration-500 hover:shadow-md relative overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-50 to-transparent rounded-full -mr-32 -mt-32"></div>
              
              <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center relative z-10">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-violet-100 flex items-center justify-center mr-3 text-rose-600">
                  {activePath === '/Sleep1' ? '🏠' : navItems.find(item => item.path === activePath)?.icon || '📌'}
                </span>
                当前页面: {activePath === '/Sleep1' ? '首页' : activePath.substring(1)}
              </h2>
              
              <div className="relative z-10">
                <p className="text-slate-600 mb-6 leading-relaxed">
                  点击左侧导航栏可切换到不同的功能模块，体验各种实用小组件的功能。
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg flex items-start mt-8">
                  <p className="text-blue-700 text-sm flex items-start">
                    <i className="fas fa-lightbulb-o mt-1 mr-2 text-blue-500"></i>
                    <span>提示: 若点击无反应，请检查控制台是否有错误信息以便调试</span>
                  </p>
                </div>
              </div>
              
              {/* 底部装饰元素 */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-violet-100 rounded-full opacity-50"></div>
            </div>
            
            {/* 功能卡片预览区 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {navItems.map((item) => (
                <div 
                  key={item.path}
                  className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => handleNavigate(item.path)}
                >
                  <div className="text-xl mb-3">{item.icon}</div>
                  <h3 className="font-medium text-slate-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-slate-500">点击进入 {item.name} 功能</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 页脚 */}
        <div className="bg-slate-800 text-slate-300 py-4 px-6 text-center text-sm">
          <p>© {new Date().getFullYear()} 小组件集合 | 实用工具</p>
        </div>
      </div>
    </div>
  )
}

export default Overrall
