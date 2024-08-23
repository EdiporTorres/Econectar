import { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../Context/AuthContext';
import { UsuarioLogin } from '../../Models/UsuarioLogin';

function Login() {
  let navigate = useNavigate();
  
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
    token: '',
    cover: '',
    cpf: '',
    endereco: '',
    dataNascimento: '',
    servicosVendidos: [],
    servicosComprados: []
  });

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home');
    }
  }, [usuario, navigate]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="grid grid-cols-1 h-screen place-items-center font-bold bg-custom">
      <form className="flex flex-col w-full max-w-md gap-6 bg-login border-2 border-blue-500 rounded-lg p-6" onSubmit={login}>
      <h2 className="text-4xl text-blue-600 text-center">Login</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="usuario" className="mb-1 font-semibold">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Nome de usuário"
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="senha" className="mb-1 font-semibold">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuarioLogin.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>
        <button type="submit" className="rounded bg-indigo-600 hover:bg-indigo-600 text-white w-full py-2 flex justify-center items-center">
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span className='text-white'>Entrar</span>
          )}
        </button>
        <hr className="border-slate-800 w-full" />
        <p className='text-dark text-center'>
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-indigo-800 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
