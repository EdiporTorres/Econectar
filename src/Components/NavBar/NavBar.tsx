import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import { toastAlerta } from '../../Util/Toastalert';
import logo from '../../assets/logo.png';
import './NavBar.css';

function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout(); // Chama a função de logout do contexto
    toastAlerta('Logout realizado com sucesso!', 'info'); // Exibe uma mensagem de sucesso
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <nav className='w-full bg-orange-600 text-white'>
      <div className='container mx-auto flex justify-between items-center py-4 px-6'>
        {/* Logo */}
        <div className='text-2xl font-bold uppercase'>
          <Link to='/'>
            <img src={logo} alt='Logo' className='h-10' />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className='flex gap-6 items-center fontcustom'>
          <Link to='/home' className='hover:bg-indigo-700 px-4 py-2 rounded transition duration-300'>Home</Link>
          <Link to='/servico' className='hover:bg-indigo-700 px-4 py-2 rounded transition duration-300'>Serviços</Link>
          <Link to='/categoria' className='hover:bg-indigo-700 px-4 py-2 rounded transition duration-300'>Categoria</Link>
          <Link to='/cadastrocategoria' className='hover:bg-indigo-700 px-4 py-2 rounded transition duration-300'>Cadastrar Categoria</Link>
          <Link to='/perfil' className='hover:bg-indigo-700 px-4 py-2 rounded transition duration-300'>Perfil</Link>
        </div>

        {/* Icons */}
        <div className='flex gap-4 items-center'>
          <Link to='/cart' className='text-lg hover:text-gray-300'>
            <FaShoppingCart />
          </Link>
          <Link to='/login' className='hover:text-gray-300'>
            <FaUser />
          </Link>
          <button onClick={logout} className='hover:text-gray-300'>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
