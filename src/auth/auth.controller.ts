import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateSchema } from '../users/schema.validate';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; name: string }) {
    const parsedData = UserCreateSchema.safeParse(body);
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.errors[0].message };
    }
    try {
      const { email, name } = body;
      const auth = await this.authService.createToken(name, email);
      return {
        token: `Bearer ${auth}`,
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
    }
  }
}
