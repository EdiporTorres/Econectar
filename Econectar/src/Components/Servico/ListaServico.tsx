import { useContext, useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Servico from '../../Models/Servico';
import { AuthContext } from '../../Context/AuthContext';
import { buscar } from '../../Service/Services';
import CardServico from './CardServico';
import LogoEconectar from '../../assets/LogoEconectar.png';
import ModalServico from '../../Components/Servico/ModalServico';
import { toastAlerta } from '../../Util/Toastalert';

function ListaServico() {
  const [servico, setServico] = useState<Servico[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarServico() {
    try {
      await buscar('/servico', setServico, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (usuario.token === '') {
      toastAlerta('Faça login para ver os serviços disponiveis!.', 'erro')
      navigate('/home');
    }
  }, [usuario.token, navigate]);

  useEffect(() => {
    buscarServico();
  }, [servico.length]);
  return (
    <>
      {servico.length === 0 && (
        <MagnifyingGlass
        visible={true}
        height="140"
        width="140"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper mx-auto"
        glassColor="#c0efff"
        color="#EA580C"
        />
      )}
      <div className='text-center flex justify-center'><img src={LogoEconectar} alt="" /></div>
      <div className='text-center flex justify-center'>      <ModalServico /></div>
      <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {servico.map((servico) => (
          <CardServico key={servico.id} serv={servico} />
        ))}
      </div>
    </>
  );
}

export default ListaServico;