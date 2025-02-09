import { Injectable } from '@nestjs/common';

import { PostEntity } from '../../../database/entities/post.entity';
import { UserMapper } from '../../users/services/user.mapper';
import { ListPostQueryDto } from '../dto/req/list-post-query.dto';
import { ListPostQueryResDto } from '../dto/res/list-post-query.res.dto';
import { PostResDto } from '../dto/res/post.res.dto';

@Injectable()
export class PostMapper {
  public static toResDto(data: PostEntity): PostResDto {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      created: data.created,
      updated: data.updated,
      user: data.user ? UserMapper.toResDto(data.user) : null,
    };
  }

  public static toResDtoList(
    data: PostEntity[],
    total: number,
    query: ListPostQueryDto,
  ): ListPostQueryResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
