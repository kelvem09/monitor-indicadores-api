import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { HelpModule } from './help/help.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || 'database.sqlite',
      synchronize: process.env.TYPEORM_SYNCHRONIZE !== 'false',
      autoLoadEntities: true,
    }),
    HelpModule,
    AuthModule,
    UsersModule,
    MunicipiosModule,
    RelatoriosModule,
  ],
})
export class AppModule {}