import React from 'react';
import Home from './Home/Home';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/NavBar/Login';
import Servicos from './Components/NavBar/Servicos';
import Sobrenos from './Components/NavBar/Sobrenos';
import { Link, useNavigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';



import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
        <NavBar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/inicio" element={<Home />} />
              <Route path="/servicos" element={<Servicos />} />
              <Route path="/sobrenos" element={<Sobrenos />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    
    </>
);
}
export default App;