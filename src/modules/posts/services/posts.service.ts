import { Injectable } from '@nestjs/common';

import { PostID } from '../../../common/types/entity-ids.type';
import { PostEntity } from '../../../database/entities/post.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { PostRepository } from '../../repository/services/post.repository';
import { CreatePostDto } from '../dto/req/create-post.dto';
import { ListPostQueryDto } from '../dto/req/list-post-query.dto';
import { UpdatePostDto } from '../dto/req/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  public async create(
    userData: IUserData,
    dto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postRepository.save(
      this.postRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
  }

  public async findAll(
    userData: IUserData,
    query: ListPostQueryDto,
  ): Promise<[PostEntity[], number]> {
    return await this.postRepository.findAll(userData, query);
  }

  public async update(userData: IUserData, postId: PostID, dto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (post.user_id !== userData.userId) {
      throw new Error('Email already exists');
    }
    post.title = dto.title;
    post.description = dto.description;

    return await this.postRepository.save(this.postRepository.merge(post, dto));
  }

  public async remove(postId: PostID): Promise<any> {
    return await this.postRepository.delete({ id: postId });
  }
}
