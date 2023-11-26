import {
  Controller,
  Post,
  Body,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtTokenService } from './jwt/jwt-token.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtTokenService: JwtTokenService
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return user;
  }

  @Post('refresh')
  public async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto
  ): Promise<LoginResponseDto> {
    try {
      const token = await this.jwtTokenService.verifyRefreshToken(
        refreshTokenDto.refreshToken
      );

      return await this.authService.refreshToken(token.id, token.email);
    } catch (e) {
      if (e.name === 'JsonWebTokenError') {
        throw new BadRequestException(
          'Could not refresh token.',
          'JsonWebTokenError'
        );
      } else if (e.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'Refresh token has expired.',
          'RefreshTokenExpiredError'
        );
      }

      throw new InternalServerErrorException(e);
    }
  }
}
