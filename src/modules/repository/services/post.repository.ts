import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PostEntity } from '../../../database/entities/post.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { ListPostQueryDto } from '../../posts/dto/req/list-post-query.dto';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PostEntity, dataSource.manager);
  }

  public async findAll(
    userData: IUserData,
    query: ListPostQueryDto,
  ): Promise<[PostEntity[], number]> {
    const qb = this.createQueryBuilder('posts');
    qb.leftJoinAndSelect('posts.user', 'user');

    if (query.search) {
      qb.andWhere('CONCAT(posts.title, user.email) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
