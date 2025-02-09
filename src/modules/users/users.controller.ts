import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { IUserData } from '../auth/models/interface/user-data.interface';
import { PostMapper } from '../posts/services/post.mapper';
import { ListUserQueryDto } from './models/dto/req/list-user-query.dto';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { ListUserQueryResDto } from './models/dto/res/list-user-query.res.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UserMapper } from './services/user.mapper';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'All users', description: 'Look all users' })
  @Get('users')
  public async findUsers(
    @CurrentUser() userData: IUserData,
    @Query() query: ListUserQueryDto,
  ): Promise<ListUserQueryResDto> {
    const [entities, total] = await this.usersService.findUsers(
      userData,
      query,
    );
    return UserMapper.toResDtoList(entities, total, query);
  }

  @ApiBearerAuth()
  @Patch('update')
  public async update(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    const result = await this.usersService.updateUser(userData, updateUserDto);

    return UserMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete('del')
  public async removeMe(@CurrentUser() userData: IUserData): Promise<void> {
    return await this.usersService.removeUser(userData);
  }

  @SkipAuth()
  @ApiBearerAuth()
  @Get(':userId')
  public async findOne(
    @Param('userId', ParseUUIDPipe) userId: UserID,
  ): Promise<UserResDto> {
    const result = await this.usersService.findOne(userId);

    return UserMapper.toResDto(result);
  }
}
