import React, { useState, useEffect } from 'react';
import './Home.css';
import ListaServico from '../../Components/Servico/ListaServico';
import LogoPerry from '../../assets/PerryEconectar.png';

function Home() {
  const words = ["vidas!", "pessoas!", "serviços!"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 100);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (charIndex < currentWord.length) {
        setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 150);
      } else {
        setTimeout(() => setIsDeleting(true), 1000);
      }
    }
  }, [charIndex, isDeleting]);

  return (
    <>
      <div className="flex justify-center py-8 bghome1">
        <div className='container grid grid-cols-1 md:grid-cols-1 gap-8 text-white'>
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className='text-5xl font-bold'>
              Conectando <span className='txt-custom'>{displayedText}</span>
            </h2>
          </div>
        </div>
      </div>
      <ListaServico />
      {/* Seção Sobre Nós */}
      <div className="sobre flex flex-col md:flex-row items-center justify-center py-8 px-4 bg-opacity-75 bg-cover">
        {/* Logo */}
        <div className="md:w-1/3 w-full flex justify-center md:justify-end mb-4 md:mb-0">
          <img src={LogoPerry} alt="Logo" className="max-w-full h-auto" />
        </div>

        <div className="md:w-2/3 w-full text-center md:text-left px-4">
        <h2 className='text-center txt-sobre'>Sobre</h2>
          <p className='sobretxt text-stroke text-center'>
          A E-conectar é um marketplace inovador que reúne serviços sustentáveis, alinhado com o Objetivo de Desenvolvimento Sustentável 11 (ODS 11) da ONU, que visa tornar cidades e comunidades mais inclusivas, seguras, resilientes e sustentáveis. Na E-conectar, acreditamos que a sustentabilidade é o caminho para o futuro, e por isso, conectamos consumidores conscientes a prestadores de serviços comprometidos com práticas ecológicas. Nossa plataforma oferece uma ampla gama de serviços que promovem a eficiência energética, a mobilidade sustentável, a gestão de resíduos e o consumo responsável, ajudando a construir um ambiente urbano mais equilibrado e sustentável para todos.
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
