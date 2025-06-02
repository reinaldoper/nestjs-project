import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const { authorization } = context.switchToHttp().getRequest().headers;
      if (!authorization) {
        throw new UnauthorizedException('Authorization header is missing');
      }
      if (!authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid authorization header');
      }
      const isValid = this.authService.checkToken(authorization as string);
      if (!isValid) {
        throw new UnauthorizedException('Invalid token');
      }
      return this.authService.checkToken(authorization as string);
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      throw new UnauthorizedException();
    }
  }
}
