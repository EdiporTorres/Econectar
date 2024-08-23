import React, { useState } from 'react';

export interface UsuarioLogin {
  id: number;
  usuario: string;
  nome: string;
  senha: string;
  endereco: string;
  cpf: string;
  dataNascimento: string;
  foto: string;
  servicosVendidos: string[];
  servicosComprados: string[];
  token: string;
  cover: string;
  
  
}

const UsuarioLoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    usuario: '',
    nome: '',
    senha: '',
    endereco: '',
    cpf: '',
    dataNascimento: '',
    foto: '',
    servicosVendidos: [],
    servicosComprados: [],
    token: '',
    cover: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUsuario((prevState) => ({
        ...prevState,
        [name]: [value] // Colocando o valor dentro de um array para `servicosVendidos`
    }));
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
 