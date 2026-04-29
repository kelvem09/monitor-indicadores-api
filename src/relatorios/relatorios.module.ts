import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatoriosController } from './relatorios.controller';
import { RelatoriosService } from './relatorios.service';
import { Relatorio } from './relatorio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Relatorio])],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
  exports: [TypeOrmModule],
})
export class RelatoriosModule {}
