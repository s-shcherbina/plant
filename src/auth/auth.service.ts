import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { CreateUserDTO } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByPhone(dto.phone);
    if (existUser)
      throw new BadRequestException(
        'Цей номер закріплений за іншим користувачем',
      );
    const user = await this.userService.createUser(dto);
    const userData = { id: user.id, name: user.name, phone: user.phone };
    const token = await this.tokenService.generateJwtToken(userData);

    return { ...userData, token };
  }
}
