import { Link } from 'react-router-dom'
import Servico from '../../Models/Servico'


interface CardServicoProps {
  serv: Servico
}

function CardServico({serv}: CardServicoProps) {
  return (
    <div className='border-2 border-blue-500 border-solid flex flex-col rounded-2xl overflow-hidden justify-between'>
      <div>
        <div className="flex w-full bg-white py-2 px-4 items-center gap-4 bgteste">
          <img src={serv.vendedor?.foto} className='h-12 rounded-full' alt="FOTO VEM AQUI" />
          <h3 className='text-lg font-bold text-center uppercase text-red-300 '>{serv.vendedor?.nome}</h3>
        </div>
        <div className='p-4 bg-white'>
          <h4 className='text-lg font-semibold uppercase'>{serv.nomeServico}</h4>
          <p>{serv.descricao}</p>
          <p>Categoria: {serv.Categoria?.descricao}</p>
        </div>
      </div>
      <div className="flex">
      <Link to={`/editarServico/${serv.id}`} className='w-full text-white bg-orange-400  hover:bg-orange-500 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarServico/${serv.id}`} className='text-white bg-red-500 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardServico