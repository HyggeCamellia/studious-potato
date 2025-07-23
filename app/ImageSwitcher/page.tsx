"use client"
import React, { useState, useRef, useEffect } from 'react';

const images = [
    '/img/three.png',
    '/img/four.png',
    '/img/five.png',
    '/img/six.png',
    '/img/seven.png',
    '/img/eight.png',
    '/img/nine.png',
    '/img/ten.png',
    '/img/eleven.png',
    '/img/twelve.png',
    '/img/thirteen.png',
];

const ImageSwitcher = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    // 加载状态管理
    const handleLoad = () => {
        setIsLoading(false);
        setError(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setError(true);
        console.error('图片加载失败:', images[currentIndex]);
    };

    // 切换到下一张图片
    const nextImage = () => {
        setIsLoading(true);
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
    };

    // 切换到上一张图片
    const prevImage = () => {
        setIsLoading(true);
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
    };

    // 键盘导航支持
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // 图片预览缩略图
    const renderThumbnails = () => (
        <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((img, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                        setCurrentIndex(idx);
                        setIsLoading(true);
                    }}
                    className={`w-16 h-12 rounded-md overflow-hidden transition-all duration-300 ${
                        currentIndex === idx 
                            ? 'ring-2 ring-blue-500 scale-110' 
                            : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                    aria-label={`切换到图片 ${idx + 1}`}
                >
                    <img 
                        src={img} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                </button>
            ))}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg border border-slate-200">
            {/* 标题区域 */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        图片切换器
                    </span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"></span>
                </h1>
                <p className="text-slate-500 mt-2">浏览图片集，支持键盘方向键导航</p>
            </div>

            {/* 图片展示区域 */}
            <div className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200 transition-all duration-500 hover:shadow-md">
                {/* 加载状态 */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* 错误状态 */}
                {error && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10 p-6 text-center">
                        <div className="text-red-400 text-5xl mb-4">⚠️</div>
                        <p className="text-red-600 font-medium">图片加载失败</p>
                        <p className="text-sm text-red-500 mt-2">请检查图片路径是否正确</p>
                    </div>
                )}

                {/* 主图片 */}
                <div className="aspect-video w-full flex items-center justify-center p-4 sm:p-8">
                    <img
                        ref={imageRef}
                        src={images[currentIndex]}
                        alt={`图片 ${currentIndex + 1}`}
                        className={`w-full h-full object-contain transition-all duration-500 transform ${
                            isLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading="lazy"
                    />
                </div>

                {/* 图片计数 */}
                <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* 按钮区域 */}
            <div className="flex justify-center gap-6 mt-8">
                <button
                    onClick={prevImage}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-lg">←</span>
                    <span>上一张</span>
                </button>
                <button
                    onClick={nextImage}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>下一张</span>
                    <span className="text-lg">→</span>
                </button>
            </div>

            {/* 缩略图导航 */}
            {renderThumbnails()}

            {/* 提示信息 */}
            <div className="mt-6 text-center text-sm text-slate-500">
                <p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
                        <span>←</span> <span>→</span>
                    </span>
                    {' '}使用方向键快速导航
                </p>
            </div>
        </div>
    );
};

export default ImageSwitcher;