import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Categoria from '../../Models/Categoria';
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

  const [servico, setServico] = useState({
    id: 0,
    nomeServico: '',
    descricao: '',
    valor: 0,
    sobreMim: '',
    status: '',
    vendedor: {
      id: 0,
      usuario: '',
      nome: '',
      senha: '',
      endereco: '',
      cpf: '',
      dataNascimento: '',
      foto: '',
      servicosVendidos: [],
      servicosComprados: [],
    },
    comprador: null,
    categoria: {
      id: 0,
      nomeCategoria: '',
      descricao: '',
    },
  });

  async function buscarServicoPorId(id: string) {
    await buscar(`/servico/${id}`, setServico, {
      headers: {
        Authorization: token,
      },
    });
  }

  const buscarCategoriaPorId = (id: string) => {
    const categoriaSelecionada = categorias.find((categoria) => categoria.id === Number(id));
    if (categoriaSelecionada) {
      setServico((prevServico) => ({
        ...prevServico,
        categoria: categoriaSelecionada,
      }));
    }
  };

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
      buscarServicoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setServico({
      ...servico,
      categoria: categoria,
      vendedor: usuario, // Atualiza o estado do serviço com o usuário logado
    });
  }, [categoria, usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setServico({
      ...servico,
      [e.target.name]: e.target.value,
      categoria: categoria,
      vendedor: usuario,
    });
  }

  function retornar() {
    navigate('/servicos');
  }

  async function gerarNovoServico(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
  
    // Construa o objeto JSON conforme o formato esperado
    const dadosServico = {
      id: servico.id || 0,
      nomeServico: servico.nomeServico || '',
      descricao: servico.descricao || '',
      valor: Number(servico.valor) || 0, // Converta o valor para número
      sobreMim: servico.sobreMim || '',
      status: servico.status || '',
      vendedor: {
        id: servico.vendedor?.id || 0,
        usuario: servico.vendedor?.usuario || '',
        nome: servico.vendedor?.nome || '',
        senha: servico.vendedor?.senha || '',
        endereco: servico.vendedor?.endereco || '',
        cpf: servico.vendedor?.cpf || '',
        dataNascimento: typeof servico.vendedor?.dataNascimento === 'object' ? (servico.vendedor.dataNascimento as Date).toISOString().split('T')[0] : '', // Converta para string
        foto: servico.vendedor?.foto || '',
        servicosVendidos: servico.vendedor?.servicosVendidos || [],
        servicosComprados: servico.vendedor?.servicosComprados || [],
      },
      comprador: servico.comprador || null, // Pode ser null se não houver comprador
      categoria: {
        id: servico.categoria?.id || 0,
        nomeCategoria: servico.categoria?.nomeCategoria || '',
        descricao: servico.categoria?.descricao || '',
      },
    };
  
    console.log('Dados do serviço:', dadosServico); // Adicione este log para verificar os dados
  
    if (id != undefined) {
      try {
        await atualizar(`/servico`, dadosServico, setServico, {
          Authorization: token,
        });
        alert('Servico atualizado com sucesso');
        retornar();
      } catch (error: any) {
        console.error('Erro ao atualizar o serviço:', error.response ? error.response.data : error.message); // Adicione este log para verificar o erro
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente');
          handleLogout();
        } else {
          alert('Erro ao atualizar o Servico');
        }
      }
    } else {
      try {
        await cadastrar(`/servico`, dadosServico, setServico, {
          Authorization: token,
        });
  
        alert('Servico cadastrado com sucesso');
        retornar();
      } catch (error: any) {
        console.error('Erro ao cadastrar o serviço:', error.response ? error.response.data : error.message); // Adicione este log para verificar o erro
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente');
          handleLogout();
        } else {
          alert('Erro ao cadastrar o Servico');
        }
      }
    }
  }

  const carregandoCategoria = categoria.descricao === '';

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Servico' : 'Cadastrar Servico'}</h1>

      <form onSubmit={gerarNovoServico} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nomeServico">Nome do Servico</label>
          <input
            value={servico.nomeServico}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Nome do Servico"
            name="nomeServico"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição do Servico</label>
          <input
            value={servico.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Descrição"
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="valor">Valor do Servico</label>
          <input
            value={servico.valor}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="number"
            placeholder="Valor"
            name="valor"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sobreMim">Sobre o Vendedor: </label>
          <input
            value={servico.sobreMim}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Sobre Mim"
            name="sobreMim"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Categoria do Servico</p>
          <select
            name="categoria"
            id="categoria"
            className="border p-2 border-slate-800 rounded"
            value={servico.categoria.id}
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {Array.isArray(categorias) && categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto block py-2">
          {carregandoCategoria ? <span>Enviar</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioServico;