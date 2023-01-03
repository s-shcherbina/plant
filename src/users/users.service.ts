import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto';
import { User } from './models/user.models';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async findUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
    });
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create({
      name: dto.name,
      phone: dto.phone,
      local: dto.local,
      service: dto.service,
      department: dto.department,
    });
    return user;
  }

  async updateUser(id: number, dto: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    const checkUserByPhone = await this.findUserByPhone(user.phone);
    if (checkUserByPhone)
      throw new BadRequestException(
        'Цей номер закріплений за іншим користувачем',
      );
    await user.update(dto);
    return user;

    // await this.userRepository.update(dto, {
    //   where: { id },
    // });
  }

  async deleteUser(phone: string): Promise<boolean> {
    await this.userRepository.destroy({ where: { phone } });
    return true;
  }

  // async updateUser(id: string, dto: CreateUserDTO): Promise<User> {
  //   const checkUser = await this.userRepository.findOne({
  //     where: { id },
  //   });
  //   // const checkUserByPhone = await this.findUserByPhone(checkUser.phone);
  //   const checkUserByPhone = await this.userRepository.findOne({
  //     where: { phone: checkUser.phone },
  //   });
  //   if (checkUserByPhone)
  //     throw new BadRequestException(
  //       'Цей номер закріплений за іншим користувачем',
  //     );
  //   // await this.userRepository.update(dto, {
  //   //   where: { id },
  //   // });
  //   await checkUser.update(dto);
  //   // const user = await this.userRepository.findOne({
  //   //   where: { id },
  //   // });
  //   return checkUser;
  // }
}
