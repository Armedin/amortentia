import {
  Logger,
  ConflictException,
  InternalServerErrorException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../../utilities/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private bcryptService: BcryptService
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const salt = await this.bcryptService.genSalt(10);
    const hashedPassword = await this.bcryptService.hash(
      registerUserDto.password,
      salt
    );

    const createdUser = await this.saveUser({
      ...registerUserDto,
      password: hashedPassword,
    });

    return createdUser;
  }

  async saveUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async updateUserById(id: string, dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.findUserById(id);
      const updatedUser = await this.userRepository.save({
        ...user,
        ...dto,
      });

      this.logger.log(
        `A user has been updated with ID: ${id} | Date: ${new Date().toLocaleString()}`
      );

      return updatedUser;
    } catch (e) {
      this.logger.error('Error updating user information. Details:', e);
      throw new InternalServerErrorException(e);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
