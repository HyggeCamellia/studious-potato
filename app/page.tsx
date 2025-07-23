'use client';
import React from 'react';
// 删除react-router-dom导入
import Overrall from './Overrall/page';

export default function Home() {
  return (
    <>
      {/* 删除BrowserRouter包裹 */}
      <Overrall></Overrall>
    </>
  )
}