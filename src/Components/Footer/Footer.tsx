import LogoPerryi from '../../assets/PerryinvEconectar.png';
import Linkedin from '../../assets/linkedin.png';
import './Footer.css'

function Footer() {

  let data = new Date().getFullYear()

  return (
    <footer className='w-full bg-orange-600 text-white'>
      <div className='container mx-auto py-6 flex flex-col items-center justify-center gap-4'>
        {/* Logo e Texto */}
        <div className='flex items-center gap-10'>
          <img src={LogoPerryi} alt="Logo" className="perryi" />
          <p className='text-xl font-bold'>E-Conectar | Copyright © {data}</p>
        </div>

        {/* Nomes e LinkedIn */}
        <div className='flex items-center gap-2'>
          <img src={ Linkedin } alt="" className='linkedin'/>
          <p className='text-lg'>
          <a href="https://www.linkedin.com/in/daniellopesdev/" target='_blank'>Daniel / </a> 
          <a href="https://www.linkedin.com/in/eduardorodwada/" target='_blank'>Eduardo / </a> 
          <a href="https://www.linkedin.com/in/edipo-torres/" target='_blank'>Édipo / </a>
          <a href="https://www.linkedin.com/in/julio-bellini-vilas-boas-b39770196/" target='_blank'>Julio / </a>
          <a href="https://www.linkedin.com/in/luana-silva-b3a01a270/" target='_blank'>Luana / </a>
          <a href="https://www.linkedin.com/in/paolav-silva/" target='_blank'>Paola</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
