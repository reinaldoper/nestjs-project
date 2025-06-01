import { Injectable } from '@nestjs/common';
import { Post, Prisma, PrismaClient } from 'generated/prisma';

@Injectable()
export class PostsService {
  private prisma = new PrismaClient();
  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data });
  }
  async getPostById(id: number): Promise<Post | null> {
    return await this.prisma.post.findUnique({ where: { id } });
  }
  async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }
  async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return await this.prisma.post.update({
      where: { id },
      data,
    });
  }
  async deletePost(id: number): Promise<Post> {
    return await this.prisma.post.delete({ where: { id } });
  }
  async closeConnection(): Promise<void> {
    await this.prisma.$disconnect();
  }
  async getPostsByUserId(authorId: number): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { authorId },
    });
  }
}
