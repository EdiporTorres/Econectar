import { Link } from 'react-router-dom'
import Servico from '../../Models/Servico'
import './CardServico.css'; // Importa o CSS personalizado
import ModalSabermais from '../../Components/Servico/ModalSabermais';

interface CardServicoProps {
  serv: Servico
}

function CardServico({ serv }: CardServicoProps) {
  return (
    <div className='card-servico'>
       <div className="flex w-full gap-4 justify-end">
          <img src='/src/assets/PerryEconectar.png' alt='Ícone Perry' className='h-10 w-10' />
        </div>
      <div className='card-servico-content flex flex-col'>
        <h4 className='text-lg font-semibold uppercase'>{serv.nomeServico}</h4>
        <p>{serv.descricao}</p>
        <p>Categoria: {serv.Categoria?.nomeCategoria}</p>
        <p className='font-bold'>Valor: {serv.valor.toFixed(2)}</p>
        <div className='mt-auto text-center'>
          <p><ModalSabermais serv={serv}/></p>
        </div>
      </div>
      <div className='card-servico-footer'>
        <Link to={`/editarServico/${serv.id}`} className='edit-button'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarServico/${serv.id}`} className='delete-button'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardServico
