import Servico  from "./Servico";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  cpf: string;
  endereco: string;
  dataNascimento: Date;
  Servico?: Servico | null;
}