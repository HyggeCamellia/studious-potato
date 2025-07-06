'use client';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import TaskBoard from './TaskBoard/page';
import Overrall from './Overrall/page';

export default function Home() {
  return (
    <>
      <BrowserRouter>
      <Overrall></Overrall>
       <TaskBoard></TaskBoard>
      </BrowserRouter>

    </>
  )
}