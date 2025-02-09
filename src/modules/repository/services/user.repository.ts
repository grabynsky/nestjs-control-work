import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { ListUserQueryDto } from '../../users/models/dto/req/list-user-query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findUsers(
    userData: IUserData,
    query: ListUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('users');
    if (query.search) {
      qb.andWhere('users.email = :email', { email: query.search });
    }
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
