import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Prisma } from '@prisma/client';
import { PostCreateSchema } from './schema.validate';
import { AuthGuard } from 'src/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPost(@Body() postData: Prisma.PostCreateInput) {
    try {
      const parsedData = PostCreateSchema.safeParse(postData);
      if (!parsedData.success) {
        return { success: false, error: parsedData.error.errors[0].message };
      }
      const post = await this.postsService.createPost(postData);
      return { success: true, post };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @UseGuards(AuthGuard)
  @Get('user/:authorId')
  async getPostsByUserId(@Param('authorId') authorId: string) {
    try {
      const posts = await this.postsService.getPostsByUserId(Number(authorId));
      return { success: true, posts };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllPosts() {
    try {
      const posts = await this.postsService.getAllPosts();
      return { success: true, posts };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    try {
      const post = await this.postsService.getPostById(Number(id));
      return { success: true, post };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id/update')
  async updatePost(
    @Param('id') id: string,
    @Body() postData: Prisma.PostUpdateInput,
  ) {
    try {
      const parsedData = PostCreateSchema.safeParse(postData);
      if (!parsedData.success) {
        return { success: false, error: parsedData.error.errors[0].message };
      }
      const post = await this.postsService.updatePost(Number(id), postData);
      return { success: true, post };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id/delete')
  async deletePost(@Param('id') id: string) {
    try {
      const post = await this.postsService.deletePost(Number(id));
      return { success: true, post };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: 'Unknown error' };
    }
  }
}
