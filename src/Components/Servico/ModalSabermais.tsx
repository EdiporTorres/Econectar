import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Servico from '../../Models/Servico';

import './ModalServico.css';

interface ModalSabermaisProps {
  serv: Servico;
}

function ModalSabermais({ serv }: ModalSabermaisProps) {
  return (
    <Popup 
      trigger={<button className='border rounded bg-white px-5 py-3 text-dark'>Saber mais</button>} modal>
      <div className='modal-content'>
        <h2 className='text-center'>Sobre o Serviço</h2><br />
        {/* Exibindo a propriedade sobreMim no modal */}
        <p className='text-center'>{serv.sobreMim}</p>
      </div>
    </Popup>
  );
}

export default ModalSabermais;
