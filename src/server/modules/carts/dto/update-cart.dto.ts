import { IsDecimal, IsOptional, IsString } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  shipping_address?: any;

  @IsOptional()
  email?: string;
}
