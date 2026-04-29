import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  toResponseDto(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado.');
    }

    const senhaHash = await bcrypt.hash(createUserDto.senha, 10);

    const user = this.usersRepository.create({
      nome: createUserDto.nome,
      email: createUserDto.email,
      senha: senhaHash,
      role: createUserDto.role,
      municipio: createUserDto.municipioId
        ? ({ id: createUserDto.municipioId } as any)
        : undefined,
    });

    const saved = await this.usersRepository.save(user);
    const full = await this.usersRepository.findOneOrFail({ where: { id: saved.id } });
    return new UserResponseDto(full);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map((u) => new UserResponseDto(u));
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário ${id} não encontrado.`);
    }
    await this.usersRepository.remove(user);
  }
}
