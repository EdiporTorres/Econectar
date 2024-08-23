  import { useContext, useEffect, useState } from 'react';
  import { Dna } from 'react-loader-spinner';
  import { useNavigate } from 'react-router-dom';
  import Categoria from '../../Models/Categoria';
  import { AuthContext } from '../../Context/AuthContext';
  import CardCategorias from './CardCategoria';
  import { buscar } from '../../Service/Services';
  import { toastAlerta } from '../../Util/Toastalert';
  import LogoEconectar from '../../assets/LogoEconectar.png';

  function ListaCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    let navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategorias() {
      try {
        await buscar('/categorias', setCategorias, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if(error.toString().includes('403')) {
          toastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        }
      }
    }

    useEffect(() => {
      if (usuario.token === '') {
        toastAlerta('Faça login para ver os serviços disponiveis!.', 'erro')
        navigate('/login');
      }
    }, [usuario.token, navigate]);

    useEffect(() => {
      buscarCategorias();
    }, [categorias.length]);

    return (
      <>
        {categorias.length === 0 && (
          <Dna
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        )}
        <div className='text-center flex justify-center'><img src={LogoEconectar} alt="" /></div>
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.isArray(categorias) && categorias.map((categoria) => (
                <CardCategorias key={categoria.id} categoria={categoria} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  export default ListaCategorias;
