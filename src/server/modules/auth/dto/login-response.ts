import { User } from '../../users/user.entity';
import { JwtDto } from './jwt.dto';

export class LoginResponseDto extends JwtDto {
  user: User;
}
