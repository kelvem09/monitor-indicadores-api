import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { Municipio } from '../municipios/municipio.entity';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { RelatorioResponseDto } from './dto/relatorio-response.dto';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { Relatorio } from './relatorio.entity';

@Injectable()
export class RelatoriosService {
  constructor(
    @InjectRepository(Relatorio)
    private readonly relatorioRepository: Repository<Relatorio>,
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async create(createRelatorioDto: CreateRelatorioDto): Promise<RelatorioResponseDto> {
    const municipio = await this.municipioRepository.findOne({
      where: { id: createRelatorioDto.municipioId },
    });
    if (!municipio) {
      throw new NotFoundException('Município não encontrado.');
    }
    const relatorio = this.relatorioRepository.create({
      titulo: createRelatorioDto.titulo,
      descricao: createRelatorioDto.descricao,
      ano: createRelatorioDto.ano,
      nomeIndicador: createRelatorioDto.nomeIndicador,
      valorIndicador: createRelatorioDto.valorIndicador,
      municipio,
    });
    const saved = await this.relatorioRepository.save(relatorio);
    return new RelatorioResponseDto(saved);
  }

  async findByMunicipio(
    municipioId: number,
    user: { role: Role; municipioId?: number },
  ): Promise<RelatorioResponseDto[]> {
    const municipio = await this.municipioRepository.findOne({
      where: { id: municipioId },
    });
    if (!municipio) {
      throw new NotFoundException('Município não encontrado.');
    }
    if (user.role === Role.ADMIN_PUBLICO && user.municipioId !== municipioId) {
      throw new ForbiddenException('Acesso negado.');
    }
    const relatorios = await this.relatorioRepository.find({
      where: { municipio: { id: municipioId } },
      order: { ano: 'DESC' },
    });
    return relatorios.map((r) => new RelatorioResponseDto(r));
  }

  async update(
    id: number,
    updateRelatorioDto: UpdateRelatorioDto,
    user: { role: Role; municipioId?: number },
  ): Promise<RelatorioResponseDto> {
    const relatorio = await this.relatorioRepository.findOne({ where: { id } });
    if (!relatorio) {
      throw new NotFoundException('Relatório não encontrado.');
    }
    if (
      user.role === Role.ADMIN_PUBLICO &&
      relatorio.municipio.id !== user.municipioId
    ) {
      throw new ForbiddenException('Acesso negado.');
    }
    if (updateRelatorioDto.municipioId !== undefined) {
      const municipio = await this.municipioRepository.findOne({
        where: { id: updateRelatorioDto.municipioId },
      });
      if (!municipio) {
        throw new NotFoundException('Município não encontrado.');
      }
      relatorio.municipio = municipio;
    }
    if (updateRelatorioDto.titulo !== undefined) relatorio.titulo = updateRelatorioDto.titulo;
    if (updateRelatorioDto.descricao !== undefined) relatorio.descricao = updateRelatorioDto.descricao;
    if (updateRelatorioDto.ano !== undefined) relatorio.ano = updateRelatorioDto.ano;
    if (updateRelatorioDto.nomeIndicador !== undefined) relatorio.nomeIndicador = updateRelatorioDto.nomeIndicador;
    if (updateRelatorioDto.valorIndicador !== undefined) relatorio.valorIndicador = updateRelatorioDto.valorIndicador;
    const saved = await this.relatorioRepository.save(relatorio);
    return new RelatorioResponseDto(saved);
  }

  async remove(id: number): Promise<void> {
    const relatorio = await this.relatorioRepository.findOne({ where: { id } });
    if (!relatorio) {
      throw new NotFoundException('Relatório não encontrado.');
    }
    await this.relatorioRepository.remove(relatorio);
  }
}
