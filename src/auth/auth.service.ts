import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async createToken(name: string, email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { name: true, email: true },
    });
    if (!user || user.name !== name) {
      throw new Error('User not found');
    }
    return this.jwtService.sign({ name, email });
  }

  checkToken(token: string) {
    try {
      const isValid = this.jwtService.verify(token.replace('Bearer ', ''));
      if (!isValid) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      return false;
    }
  }
}
