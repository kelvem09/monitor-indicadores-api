import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Relatorio } from '../relatorios/relatorio.entity';
import { User } from '../users/users.entity';

@Entity('municipios')
export class Municipio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 120 })
  nome: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ name: 'codigo_ibge', length: 7, unique: true })
  codigoIbge: string;

  @OneToMany(() => User, (user) => user.municipio)
  usuarios: User[];

  @OneToMany(() => Relatorio, (relatorio) => relatorio.municipio)
  relatorios: Relatorio[];
}