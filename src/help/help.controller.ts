import { Controller, Get } from '@nestjs/common';

@Controller('help')
export class HelpController {
  @Get()
  getHelp() {
    return {
      sistema: 'Monitor de Indicadores Municipais',
      acessoPublico: true,
      endpointsPrincipais: [
        'POST /auth/login',
        'GET /municipios',
        'GET /relatorios/municipio/:municipioId',
        'PATCH /relatorios/:id',
        'POST /usuarios',
        'DELETE /usuarios/:id',
      ],
    };
  }
}