import Categoria from './Categoria';
import Usuario from './Usuario';

export default interface Servico {
  id: number;
  nomeServico: string;
  descricao: string;
  valor: number;
  sobreMim: string;
  data: string;
  Categoria: Categoria | null;
  vendedor: Usuario | null;
  comprador: Usuario | null;
}