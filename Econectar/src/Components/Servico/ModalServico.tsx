import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalServico.css'
import FormularioServico from './FormularioServico';

function ModalServico() {
  return (
    <>
      <Popup 
      trigger={<button className='border rounded px-4 hover:bg-white hover:text-indigo-800'>Nova Serviço</button>} modal>
        <div>
          <FormularioServico />
        </div>
      </Popup>
    </>
  );
}

export default ModalServico;