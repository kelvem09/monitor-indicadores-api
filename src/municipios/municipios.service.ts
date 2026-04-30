import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MunicipioResponseDto } from './dto/municipio-response.dto';
import { Municipio } from './municipio.entity';

@Injectable()
export class MunicipiosService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.municipioRepository.count();
    if (count === 0) {
      await this.municipioRepository.save([
        { nome: 'Natal', uf: 'RN', codigoIbge: '2408102' },
        { nome: 'Parnamirim', uf: 'RN', codigoIbge: '2403251' },
        { nome: 'Mossoró', uf: 'RN', codigoIbge: '2408003' },
      ]);
    }
  }

  async findAll(): Promise<MunicipioResponseDto[]> {
    const municipios = await this.municipioRepository.find();
    return municipios.map((m) => new MunicipioResponseDto(m));
  }

  async findById(id: number): Promise<Municipio | null> {
    return this.municipioRepository.findOne({ where: { id } });
  }
}
