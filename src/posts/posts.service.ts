import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return await this.prisma.post.create({ data });
  }

  async getPostById(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } });
    return post as Post;
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async updatePost(id: number, data: Prisma.PostUpdateInput): Promise<Post> {
    return await this.prisma.post.update({ where: { id }, data });
  }

  async deletePost(id: number): Promise<Post> {
    return await this.prisma.post.delete({ where: { id } });
  }

  async getPostsByUserId(authorId: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({ where: { authorId } });
    return posts;
  }
}
