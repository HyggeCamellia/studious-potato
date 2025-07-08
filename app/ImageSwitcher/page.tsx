"use client"
import React, { useState } from'react';
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
    // 使用 useState 来管理当前显示的图片索引
    const [currentIndex, setCurrentIndex] = useState(0);

    // 切换到下一张图片的函数
    const nextImage = () => {
        const newIndex = (currentIndex + 1) % images.length;
        console.log('切换到下一张图片，索引:', newIndex, '路径:', images[newIndex]);
        setCurrentIndex(newIndex);
    };

    // 切换到上一张图片的函数
    const prevImage = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        console.log('切换到上一张图片，索引:', newIndex, '路径:', images[newIndex]);
        setCurrentIndex(newIndex);
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">图片切换器</h1>
            <div className="flex justify-center mb-4">
                <img
                    src={images[currentIndex]}
                    alt="展示图片"
                    className="w-full h-auto rounded-md"
                    onError={(e) => {
                        console.error('图片加载失败:', e);
                        // 移除设置默认图片路径的代码，先排查问题
                        // e.target.src = '/default.jpg'; 
                    }}
                    loading="lazy"
                />
            </div>
            <div className="flex justify-center gap-4">
                <button
                    onClick={prevImage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    上一张
                </button>
                <button
                    onClick={nextImage}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    下一张
                </button>
            </div>
        </div>
    );
};

export default ImageSwitcher;