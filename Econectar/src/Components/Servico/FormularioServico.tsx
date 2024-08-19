import  { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Categoria from '../../Models/Categoria';
import Servico from '../../Models/Servico';
import { atualizar, buscar, cadastrar } from '../../Service/Services';

function FormularioServico() {
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nomeCategoria: '',
    descricao: '',
  });

  const [servico, setServico] = useState<Servico>({
    id: 0,
    titulo: '',
    texto: '',
    data: '',
    Categoria: null,
    usuario: null,
  });

  async function buscarservicoPorId(id: string) {
    await buscar(`/servico/${id}`, setServico, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategorias() {
    await buscar('/categorias', setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarservicoPorId(id);
      console.log(categoria);

    }
  }, [id]);

  useEffect(() => {
    setServico({
      ...servico,
      Categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setServico({
      ...servico,
      [e.target.name]: e.target.value,
      Categoria: categoria,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/servicos');
  }

  async function gerarNovaservico(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ servico });

    if (id != undefined) {
      try {
        await atualizar(`/servico`, servico, setServico, {
          headers: {
            Authorization: token,
          },
        });
        alert('Servico atualizada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao atualizar a Servico');
        }
      }
    } else {
      try {
        await cadastrar(`/servico`, servico, setServico, {
          headers: {
            Authorization: token,
          },
        });

        alert('Servico cadastrada com sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a Servico');
        }
      }
    }
  }

  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Servico' : 'Cadastrar Servico'}</h1>

      <form onSubmit={gerarNovaservico} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Titulo da servico</label>
          <input
            value={servico.titulo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Titulo"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Texto da servico</label>
          <input
            value={servico.texto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria da servico</p>
          <select name="Categoria" id="Categoria" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione um Categoria</option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id} >{categoria.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button disabled={carregandoCategoria} type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2'>
          {carregandoCategoria ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioServico;