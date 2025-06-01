import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { UserCreateSchema } from './schema.validate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() userData: Prisma.UserCreateInput) {
    try {
      const parsedData = UserCreateSchema.safeParse(userData);
      if (!parsedData.success) {
        return { success: false, error: parsedData.error.errors[0].message };
      }
      const user = await this.usersService.createUser(userData);
      return { success: true, user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
  @Get()
  async getAllUsers() {
    try {
      const users = await this.usersService.getAllUsers();
      return { success: true, users };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.usersService.getUserById(Number(id));
      return { success: true, user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Prisma.UserUpdateInput,
  ) {
    try {
      const parsedData = UserCreateSchema.safeParse(userData);
      if (!parsedData.success) {
        return { success: false, error: parsedData.error.errors[0].message };
      }
      const user = await this.usersService.updateUser(Number(id), userData);
      return { success: true, user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const user = await this.usersService.deleteUser(Number(id));
      return { success: true, user };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
}
