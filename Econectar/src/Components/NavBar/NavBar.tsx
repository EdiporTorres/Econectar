import { Link, useNavigate } from 'react-router-dom'
import React from 'react'


function Navbar() {
 
  

  return (
    <>
     <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
          <div className="container flex justify-between text-lg">
            <div className='text-2xl font-bold uppercase'>E-Conectar</div>

            <div className='flex gap-4'>
            <Link to='/login' className='hover:underline'>Login</Link>
            <Link to='/inicio' className='hover:underline'>Inicio</Link>
            <Link to='/Servicos' className='hover:underline'>Serviços</Link>
            <div className='hover:underline'>Trabalhadores</div>
            <div className='hover:underline'>Cadastrar</div>
            <div className='hover:underline'>Suporte</div>
            <Link to='/Sobrenos' className='hover:underline'>Sobre nós</Link>

            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar