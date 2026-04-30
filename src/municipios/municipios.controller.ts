import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { MunicipiosService } from './municipios.service';

@ApiTags('Municípios')
@ApiBearerAuth()
@Controller('municipios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  @Roles(Role.MASTER, Role.ADMIN_PUBLICO, Role.AUDITOR)
  @ApiOkResponse({ description: 'Lista de municípios' })
  findAll() {
    return this.municipiosService.findAll();
  }
}
