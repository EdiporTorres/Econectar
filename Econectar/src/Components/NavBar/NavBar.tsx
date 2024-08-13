import { Link, useNavigate } from 'react-router-dom'
import React from 'react'


function Navbar() {
 
  

  return (
    <>
     <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
          <div className="container flex justify-between text-lg">
            <div className='text-2xl font-bold uppercase'>Blog Pessoal</div>

            <div className='flex gap-4'>
              <Link to='/login' className='hover:underline'>Login</Link>
              <Link to='/home' className='hover:underline'>Home</Link>
              <Link to='/servico' className='hover:underline'>Serviços</Link>
              <Link to='/categoria' className='hover:underline'>Categoria</Link>
              <Link to='/cadastrocategoria' className='hover:underline'>Cadastrar Categoria</Link>
              <Link to='/perfil' className='hover:underline'>Perfil</Link>
              <Link to='/sair' className='hover:underline'>Sair</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar