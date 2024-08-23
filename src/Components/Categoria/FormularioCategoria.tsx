import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../Models/Categoria';
import { AuthContext } from '../../Context/AuthContext';
import { atualizar, buscar, cadastrar } from '../../Service/Services';
import { toastAlerta } from '../../Util/Toastalert';

function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  let navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    });
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { 'Authorization': token }
        });
        alert('Categoria atualizado com sucesso');
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { 'Authorization': token }
        });
        alert('Categoria cadastrada com sucesso');
      }
      retornar();
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente');
        handleLogout();
      } else {
        alert(`Erro ao ${id !== undefined ? 'atualizar' : 'cadastrar'} a categoria`);
      }
    }
  }

  function retornar() {
    navigate('/categoria');
  }

  useEffect(() => {
    if (usuario.token === '') {
      toastAlerta('Faça login para ver os serviços disponiveis!.', 'erro')
      navigate('/login');
    }
  }, [usuario.token, navigate]);

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8 text-dark">
        {id === undefined ? 'Cadastre uma nova categoria' : 'Editar categoria'}
      </h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2 text-dark">
          <label htmlFor="nomeCategoria">Nome da categoria</label>
          <input
            type="text"
            placeholder="Nome"
            name="nomeCategoria"
            className="border-2 border-slate-700 rounded p-2 text-black font-bold"
            value={categoria.nomeCategoria}
            onChange={atualizarEstado}
          />
        </div>
        <div className="flex flex-col gap-2 text-dark">
          <label htmlFor="descricao">Descrição da categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name="descricao"
            className="border-2 border-slate-700 rounded p-2 text-black font-bold"
            value={categoria.descricao}
            onChange={atualizarEstado}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioCategoria;
