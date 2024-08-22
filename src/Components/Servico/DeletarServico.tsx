import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Servico from '../../Models/Servico'
import { AuthContext } from '../../Context/AuthContext'
import { buscar, deletar } from '../../Service/Services'



function DeletarServico() {
  const [Servico, setServico] = useState<Servico>({} as Servico)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/servico/${id}`, setServico, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/servico")
  }

  async function deletarServico() {
    try {
      await deletar(`/servico/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      alert('Servico apagada com sucesso')

    } catch (error) {
      alert('Erro ao apagar a Servico')
    }

    retornar()
  }
  return (
    <div className='container w-1/3 mx-auto text-white'>
      <h1 className='text-4xl text-center my-4'>Deletar Servico</h1>

      <p className='text-center font-semibold mb-4'>Você tem certeza de que deseja apagar a Servico a seguir?</p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>Servico</header>
        <div className="p-4">
          <p className='text-xl h-full'>{Servico.nomeServico}</p>
          <p>{Servico.descricao}</p>
        </div>
        <div className="flex">
          <button className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2' onClick={retornar}>Não</button>
          <button className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 flex items-center justify-center' onClick={deletarServico}>
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarServico