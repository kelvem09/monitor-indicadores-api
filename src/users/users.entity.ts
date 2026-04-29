import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { Municipio } from '../municipios/municipio.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true, length: 120 })
  email: string;

  @Column()
  senha: string;

  @Column({ type: 'simple-enum', enum: Role })
  role: Role;

  @ManyToOne(() => Municipio, (municipio) => municipio.usuarios, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'municipio_id' })
  municipio?: Municipio;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}