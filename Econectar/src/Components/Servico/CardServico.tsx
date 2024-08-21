import { Link } from 'react-router-dom'
import Servico from '../../Models/Servico'


interface CardServicoProps {
  serv: Servico
}

function CardServico({serv}: CardServicoProps) {
  return (
    <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
      <div>
        <div className="flex w-full  bg-slate-400 py-2 px-4 items-center gap-4">
          <img src={serv.vendedor?.foto} className='h-12 rounded-full' alt="FOTO VEM AQUI" />
          <h3 className='text-lg font-bold text-center uppercase text-red-300 '>{serv.vendedor?.nome}</h3>
        </div>
        <div className='p-4 bg-sky-50 '>
          <h4 className='text-lg font-semibold uppercase'>{serv.nomeServico}</h4>
          <p>{serv.descricao}</p>
          <p>Categoria: {serv.Categoria?.descricao}</p>
        </div>
      </div>
      <div className="flex">
      <Link to={`/editarServico/${serv.id}`} className='w-full text-white bg-stone-700  hover:bg-indigo-800 flex items-center justify-center py-2'>
          <button>Editar</button>
        </Link>
        <Link to={`/deletarServico/${serv.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardServico