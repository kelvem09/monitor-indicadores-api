import { Relatorio } from '../relatorio.entity';

export class RelatorioResponseDto {
  id: number;
  titulo: string;
  descricao: string;
  ano: number;
  nomeIndicador: string;
  valorIndicador: number;
  municipio: { id: number; nome: string; uf: string };
  createdAt: Date;
  updatedAt: Date;

  constructor(relatorio: Relatorio) {
    this.id = relatorio.id;
    this.titulo = relatorio.titulo;
    this.descricao = relatorio.descricao;
    this.ano = relatorio.ano;
    this.nomeIndicador = relatorio.nomeIndicador;
    this.valorIndicador = relatorio.valorIndicador;
    this.municipio = {
      id: relatorio.municipio.id,
      nome: relatorio.municipio.nome,
      uf: relatorio.municipio.uf,
    };
    this.createdAt = relatorio.createdAt;
    this.updatedAt = relatorio.updatedAt;
  }
}
