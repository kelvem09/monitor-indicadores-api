import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateRelatorioDto } from './dto/create-relatorio.dto';
import { UpdateRelatorioDto } from './dto/update-relatorio.dto';
import { RelatoriosService } from './relatorios.service';

@ApiTags('Relatórios')
@ApiBearerAuth()
@Controller('relatorios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Post()
  @Roles(Role.MASTER)
  @ApiCreatedResponse({ description: 'Relatório criado' })
  create(@Body() createRelatorioDto: CreateRelatorioDto) {
    return this.relatoriosService.create(createRelatorioDto);
  }

  @Get('municipio/:municipioId')
  @Roles(Role.MASTER, Role.ADMIN_PUBLICO)
  @ApiOkResponse({ description: 'Lista de relatórios do município' })
  findByMunicipio(
    @Param('municipioId', ParseIntPipe) municipioId: number,
    @Req() req: any,
  ) {
    return this.relatoriosService.findByMunicipio(municipioId, req.user);
  }

  @Patch(':id')
  @Roles(Role.MASTER, Role.ADMIN_PUBLICO)
  @ApiOkResponse({ description: 'Relatório atualizado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRelatorioDto: UpdateRelatorioDto,
    @Req() req: any,
  ) {
    return this.relatoriosService.update(id, updateRelatorioDto, req.user);
  }

  @Delete(':id')
  @Roles(Role.MASTER)
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Relatório removido' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.relatoriosService.remove(id);
  }
}
