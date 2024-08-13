import React from 'react';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';

import { Link, useNavigate } from 'react-router-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Cadastro from './Pages/Cadastro/Cadastro';
import Servicos from './Components/NavBar/Servicos';
import Sobrenos from './Components/NavBar/Sobrenos';

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
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/sobrenos" element={<Sobrenos />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    
    </>
);
}
export default App;