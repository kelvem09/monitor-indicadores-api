import { ConflictException, Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const existing = await this.usersRepository.findOne({
      where: { email: 'master@sistema.com' },
    });
    if (!existing) {
      const senhaHash = await bcrypt.hash('master123', 10);
      const master = this.usersRepository.create({
        nome: 'Master',
        email: 'master@sistema.com',
        senha: senhaHash,
        role: Role.MASTER,
      });
      await this.usersRepository.save(master);
    }
  }

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
