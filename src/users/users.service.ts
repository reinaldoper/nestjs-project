import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma, User } from 'generated/prisma';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({ data });
  }
  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }
  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async deleteUser(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
  async closeConnection(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
