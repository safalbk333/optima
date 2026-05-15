import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ClientTokenDto } from './dto/client-token.dto';
import { ClientCodeExchangeDto } from './dto/client-code-exchange.dto';


@ApiTags('Auth-Service')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {

  }

  @Get()
  @ApiOperation({
    summary: 'Get all auths',
  })
  @ApiResponse({
    status: 200,
    description: 'Auth list fetched successfully',
  })
  findAll() {
    return this.authService.findAll();
  }

  @Post('client-token')
  async getClientToken(
    @Body() dto: ClientTokenDto,
  ) {
    return this.authService.getClientToken(dto);
  }

   @Post('exchange')
  async exchange(
    @Body() dto: ClientCodeExchangeDto,
  ) {
    
    return this.authService.exchangeCode(
      dto,
    );
  }
}
