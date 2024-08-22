import LogoPerryi from '../../assets/PerryinvEconectar.png';
import './Footer.css'

function Footer() {

  let data = new Date().getFullYear()

  return (
    <footer className='w-full bg-orange-600 text-white'>
      <div className='container mx-auto py-6 flex items-center justify-center gap-10'>
        {/* Logo */}
        <img src={LogoPerryi} alt="Logo" className="perryi" />
        
        {/* Texto */}
        <p className='text-xl font-bold'>E-Conectar | Copyright © {data}</p>
      </div>
    </footer>
  );
}

export default Footer;
