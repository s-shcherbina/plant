import { IsNumber, IsString } from 'class-validator';

export class AuthUserResponse {
  @IsNumber()
  id: number;

  @IsString()
  token: string;

  @IsString()
  name: string;

  @IsString()
  phone: string;
}
