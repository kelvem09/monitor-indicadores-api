import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateRelatorioDto {
  @ApiProperty({ example: 'Relatório de Mortalidade Infantil', minLength: 3, maxLength: 150 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  titulo: string;

  @ApiProperty({ example: 'Indicador municipal de mortalidade infantil para acompanhamento anual.' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 2024 })
  @Type(() => Number)
  @IsInt()
  @Min(2000)
  @Max(2100)
  ano: number;

  @ApiProperty({ example: 'Taxa de mortalidade infantil', minLength: 3, maxLength: 80 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  nomeIndicador: string;

  @ApiProperty({ example: 12.5 })
  @IsNumber()
  valorIndicador: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  municipioId: number;
}
