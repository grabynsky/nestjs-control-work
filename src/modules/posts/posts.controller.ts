import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PostID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interface/user-data.interface';
import { CreatePostDto } from './dto/req/create-post.dto';
import { ListPostQueryDto } from './dto/req/list-post-query.dto';
import { UpdatePostDto } from './dto/req/update-post.dto';
import { ListPostQueryResDto } from './dto/res/list-post-query.res.dto';
import { PostResDto } from './dto/res/post.res.dto';
import { PostMapper } from './services/post.mapper';
import { PostsService } from './services/posts.service';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create post', description: 'Create new post' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreatePostDto,
  ): Promise<PostResDto> {
    return await this.postsService.create(userData, dto);
  }

  @SkipAuth()
  @ApiOperation({
    summary: 'All post',
    description: 'Look all post. <b>Search param for email and title</b>',
  })
  @Get()
  public async findAll(
    @CurrentUser() userDada: IUserData,
    @Query() query: ListPostQueryDto,
  ): Promise<ListPostQueryResDto> {
    const [entities, total] = await this.postsService.findAll(userDada, query);

    return PostMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Patch(':postId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('postId') postId: PostID,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostResDto> {
    return await this.postsService.update(userData, postId, updatePostDto);
  }

  @ApiBearerAuth()
  @Delete(':postId')
  public async remove(@Param('postId') postId: PostID): Promise<void> {
    return await this.postsService.remove(postId);
  }
}
