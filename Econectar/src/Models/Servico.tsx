import Categoria from './Categoria';
import Usuario from './Usuario';

export default interface Servico {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  Categoria: Categoria | null;
  usuario: Usuario | null;
}