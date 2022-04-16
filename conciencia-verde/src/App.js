import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NewDay from './Components/NewDay/NewDay';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Scroll from './Components/Scroll/Scroll';

export default function App() {
  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Scroll/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/NewDay" element={<NewDay />}/>
        </Routes>
      </BrowserRouter>
      </>
  )
}

