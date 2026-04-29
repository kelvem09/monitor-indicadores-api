import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Municipio } from '../municipios/municipio.entity';

@Entity('relatorios')
export class Relatorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'int' })
  ano: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valorIndicador: number;

  @Column({ length: 80 })
  nomeIndicador: string;

  @ManyToOne(() => Municipio, (municipio) => municipio.relatorios, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'municipio_id' })
  municipio: Municipio;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}