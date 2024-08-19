import React from 'react';
import './Home.css';
import ModalServico from '../../Components/Servico/ModalServico';
import ListaServico from '../../Components/Servico/ListaServico';

function Home() {
  return (
    <>
      <div className="bg-slate-500 flex justify-center py-8">
        <div className='container grid grid-cols-1 md:grid-cols-2 gap-8 text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>Seja Bem-Vindo!</h2>
            <div className='text-3xl font-semibold text-green-200'>
              <span className='text-4xl font-bold'>E-</span>
              <span className='change-text'></span>
            </div>
            <ModalServico />
          </div>

          <div className="flex justify-center">
            <img src="https://via.placeholder.com/600x400" alt="Descrição da imagem" className='w-full md:w-2/3 rounded-lg shadow-lg' />
          </div>
        </div>
      </div>
      <ListaServico />
    </>
  );
}

export default Home;
