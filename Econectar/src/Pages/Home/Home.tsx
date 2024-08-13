import React from 'react';

import './Home.css';



function Home() {
    return (
        <>
        <div className="bg-slate-500 flex justify-center">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Seja bem vindo!</h2>
              <p className='text-xl'>Expresse aqui seus pensamentos e opiniões</p>
  
              <div className="flex justify-around gap-4">
       

              </div>
            </div>
  
            <div className="flex justify-center ">
              <img src={""} alt="" className='w-2/3' />
      
            </div>
          </div>
        </div>
     
      </>
    );
}

export default Home;