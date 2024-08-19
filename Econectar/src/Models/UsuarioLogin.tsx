import React, { useState } from 'react';

interface UsuarioLogin {
  id: number;
  usuario: string;
  nome: string;
  senha: string;
  endereco: string;
  cpf: string;
  dataNascimento: Date;
  foto: string;
  servicosVendidos: string[];
  servicosComprados: string[];
}

const UsuarioLoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    usuario: '',
    nome: '',
    senha: '',
    endereco: '',
    cpf: '',
    dataNascimento: new Date(),
    foto: '',
    servicosVendidos: [],
    servicosComprados: []
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form>
      <select name="servicosVendidos" value={usuario.servicosVendidos[0] || ''} onChange={handleChange}>
        <option value="servico1">Serviço 1</option>
        <option value="servico2">Serviço 2</option>
      </select>
    </form>
  );
};

export default UsuarioLoginForm;