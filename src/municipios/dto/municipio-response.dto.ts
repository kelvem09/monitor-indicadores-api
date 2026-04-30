import { Municipio } from '../municipio.entity';

export class MunicipioResponseDto {
  id: number;
  nome: string;
  uf: string;
  codigoIbge: string;

  constructor(municipio: Municipio) {
    this.id = municipio.id;
    this.nome = municipio.nome;
    this.uf = municipio.uf;
    this.codigoIbge = municipio.codigoIbge;
  }
}
