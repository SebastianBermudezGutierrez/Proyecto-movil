import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException,
  Logger 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

interface TokenPayload {
  email: string;
  sub: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    if (!email || !password) {
      throw new BadRequestException('Email y contraseña son requeridos');
    }

    try {
      const user = await this.userService.findByEmail(email);
      
      if (!user) {
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        return null;
      }

      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error(`Error al validar usuario: ${error.message}`, error.stack);
      throw new UnauthorizedException('Error en la autenticación');
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    try {
      const user = await this.validateUser(loginDto.email, loginDto.password);
      
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload: TokenPayload = { 
        email: user.email, 
        sub: user.id,
        name: user.name || ''
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          name: user.name || '',
          email: user.email
        }
      };
    } catch (error) {
      this.logger.error(`Error en el login: ${error.message}`, error.stack);
      throw error;
    }
  }
}