import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Categoria from '../../Models/Categoria';
import { atualizar, buscar, cadastrar } from '../../Service/Services';
import { UsuarioLogin } from '../../Models/UsuarioLogin'; // Import the correct type for UsuarioLogin


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
    vendedor: {} as UsuarioLogin, // Update the type of vendedor to UsuarioLogin
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
    navigate('/servico');
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
  
    try {
      if (id != undefined) {
        await atualizar(`/servico/atualizar`, dadosServico, setServico, {
          headers: {
            Authorization: token,
          },
        });
        alert('Servico atualizado com sucesso');
      } else {
        await cadastrar(`/servico`, dadosServico, setServico, {
          headers: {
            Authorization: token,
          },
        });
        alert('Servico cadastrado com sucesso');
      }
      retornar();
    } catch (error: any) {
      console.error('Erro ao cadastrar/atualizar o serviço:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Erro ao cadastrar/atualizar o serviço:', error.response.data);
        if (error.response.status === 401) {
          alert('O token expirou, favor logar novamente');
          handleLogout();
        } else {
          alert('Erro ao cadastrar/atualizar o Servico');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Erro ao cadastrar/atualizar o serviço: Sem resposta do servidor', error.request);
        alert('Erro ao cadastrar/atualizar o Servico: Sem resposta do servidor');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Erro ao cadastrar/atualizar o serviço:', error.message);
        alert('Erro ao cadastrar/atualizar o Servico');
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
          <label htmlFor="sobreMim">Sobre o mim: </label>
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
          <select name="categorias" id="categorias" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}>
            <option value="" selected disabled>Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id} >{categoria.nomeCategoria}</option>
              </>
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
