import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto';
import { AuthService } from './auth.service';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registerUser(dto);
  }
}
