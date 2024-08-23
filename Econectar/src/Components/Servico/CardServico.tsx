import { Link } from 'react-router-dom'
import Servico from '../../Models/Servico'
import './CardServico.css'; // Importa o CSS personalizado

interface CardServicoProps {
  serv: Servico
}

function CardServico({ serv }: CardServicoProps) {
  return (
    <div className='card-servico'>
      <div className='card-servico-content'>
        <h4 className='text-lg font-semibold uppercase'>{serv.nomeServico}</h4>
        <p>{serv.descricao}</p>
        <p>Categoria: {serv.Categoria?.nomeCategoria}</p>
        <p>Valor: {serv.valor.toFixed(2)}</p>
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
