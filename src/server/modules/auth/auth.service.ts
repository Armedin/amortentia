import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { JwtTokenService } from './jwt/jwt-token.service';
import { BcryptService } from '../../utilities/bcrypt/bcrypt.service';
import { User } from '../users/user.entity';
import { LoginResponseDto } from './dto/login-response';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtTokenService,
    private usersService: UsersService,
    private bcryptService: BcryptService
  ) {}

  async validateUser(authCredentialsDto: LoginDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.usersService.findByEmail(email);
    if (user && (await this.bcryptService.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(loginCredentialsDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Incorrect email and/or password.');
    }

    const payload: IJwtPayload = { id: user.id, email: user.email };
    const response = this.jwtService.createAuthToken(payload);

    const authResponse: LoginResponseDto = {
      expiresIn: response.expiresIn,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user,
    };
    this.logger.debug(`Generated JWT Token for User ${user.email}`);

    try {
      user.last_login_at = new Date();
      await this.usersService.updateUserById(user.id, user);
    } catch (e) {
      this.logger.error(
        `Error updating last login date of user ${user.id}. Details: ${e}`
      );
      throw new InternalServerErrorException(e);
    }

    return authResponse;
  }

  async refreshToken(id: string, email: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Incorrect email.');
    }

    const payload: IJwtPayload = { id, email };
    const response = this.jwtService.createAuthToken(payload);

    const authResponse: LoginResponseDto = {
      expiresIn: response.expiresIn,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user,
    };

    this.logger.debug(`Refreshed JWT Token for User ${user.email}.`);

    try {
      user.last_login_at = new Date();
      await this.usersService.updateUserById(user.id, user);
    } catch (e) {
      this.logger.error(
        `Error updating last login date of user ${user.id}. Details: ${e}`
      );
      throw new InternalServerErrorException(e);
    }

    return authResponse;
  }

  async getUserFromSuccessAuth(
    id: string,
    email: string
  ): Promise<LoginResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Error getting user.');
    }

    // Refresh Auth Tokens
    const payload: IJwtPayload = { id, email };
    const response = this.jwtService.createAuthToken(payload);

    const authResponse: LoginResponseDto = {
      expiresIn: response.expiresIn,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      user,
    };

    return authResponse;
  }
}
