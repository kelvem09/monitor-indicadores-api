import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipiosModule } from '../municipios/municipios.module';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { Relatorio } from './relatorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relatorio]), MunicipiosModule],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
})
export class RelatoriosModule {}
