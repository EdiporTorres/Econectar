import { FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

function Footer() {
  return (
    <footer className='w-full bg-indigo-900 text-white'>
      <div className='container mx-auto py-6 flex flex-col items-center'>
        <p className='text-xl font-bold mb-2'>E-Conectar</p>
        <p className='text-lg mb-4'>Onde conexões geram soluções | Copyright © 2024</p>
        
        <div className='flex gap-6 mb-4'>
          <a href='/contatos' className='hover:underline'>Contatos</a>
          <a href='/sac' className='hover:underline'>SAC</a>
        </div>

        <p className='text-lg mb-4'>Acesse nossas redes sociais:</p>
        <div className='flex gap-4'>
          <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer'>
            <LinkedinLogo size={36} weight='bold' />
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
            <InstagramLogo size={36} weight='bold' />
          </a>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
            <FacebookLogo size={36} weight='bold' />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
