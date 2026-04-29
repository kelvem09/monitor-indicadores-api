import { Role } from '../../common/enums/role.enum';
import { User } from '../users.entity';

export class UserResponseDto {
  id: number;
  nome: string;
  email: string;
  role: Role;
  municipio?: {
    id: number;
    nome: string;
    uf: string;
  };

  constructor(user: User) {
    this.id = user.id;
    this.nome = user.nome;
    this.email = user.email;
    this.role = user.role;

    if (user.municipio) {
      this.municipio = {
        id: user.municipio.id,
        nome: user.municipio.nome,
        uf: user.municipio.uf,
      };
    }
  }
}