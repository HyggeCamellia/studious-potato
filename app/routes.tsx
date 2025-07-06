import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Route } from "react-router-dom";  
import Calculator from "./Calculator/page";
import Calendar from "./Calendar/page";
import Note from "./Note/page";
import WeatherWidget from "./Time/page";
import TaskBoard from "./TaskBoard/page";

const page = () => {
    const menuItems = [
        { label: '搜索识别', link: '/Calculator' },
        { label: '图片识别', link: '/Calendar' },
        { label: '判断精灵', link: '/Calendar' },
        { label: '历史数据', link: '/Note' },
        { label: '判断', link: '/Task' },
        { label: '数据', link: '/WeatherWidget' },

    ];
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/搜索识别" element={<Calculator />} />
                    <Route path="/图片识别" element={<Calendar />} />
                    <Route path="/判断精灵" element={<Calendar />} />
                    <Route path="/历史数据" element={<Note />} />
                    <Route path="/搜索识别" element={<TaskBoard />} />
                    <Route path="/图片识别" element={<WeatherWidget />} />
                </Routes>
            </div>
        </Router>
    );
};

export default page;