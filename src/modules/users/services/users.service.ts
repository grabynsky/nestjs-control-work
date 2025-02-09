import { Injectable } from '@nestjs/common';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interface/user-data.interface';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ListUserQueryDto } from '../models/dto/req/list-user-query.dto';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findUsers(
    userData: IUserData,
    query: ListUserQueryDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.findUsers(userData, query);
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  public async updateUser(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });

    this.userRepository.merge(user, dto);

    return await this.userRepository.save(user);
  }

  public async removeUser(userData: IUserData): Promise<any> {
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
    await this.userRepository.delete({ id: userData.userId });

    return { userData };
  }
}
