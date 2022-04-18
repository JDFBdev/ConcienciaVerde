import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import NewDay from './Components/NewDay/NewDay';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Scroll from './Components/Scroll/Scroll';
import Intro from './Components/Intro/Intro';

export default function App() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setTimeout(() => setOn(false), 3000);
  }, []);

  return (
    <>
      <Toaster/>
      <BrowserRouter>
        <Scroll/>
        <Routes>
          <Route path="/" element={<><Intro show={on}/><Home show={on} /></>}/>
          <Route path="/NewDay" element={<NewDay  />}/>
        </Routes>
      </BrowserRouter>
      </>
  )
}

