import { PostEntity } from "../../../database/entities/post.entity";
import { UserEntity } from '../../../database/entities/user.entity';
import { IJwtPayload } from '../../auth/models/interface/jwt-payload.interface';
import { ListPostQueryDto } from "../../posts/dto/req/list-post-query.dto";
import { ListPostQueryResDto } from "../../posts/dto/res/list-post-query.res.dto";
import { ListUserQueryDto } from "../models/dto/req/list-user-query.dto";
import { ListUserQueryResDto } from "../models/dto/res/list-user-query.res.dto";
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };
  }

  public static toIUserData(user: UserEntity, jwtPayload: IJwtPayload): any {
    return {
      userId: user.id,
      deviceId: jwtPayload.deviceId,
      email: user.email,
    };
  }

  public static toResDtoList(
    data: UserEntity[],
    total: number,
    query: ListUserQueryDto,
  ): ListUserQueryResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
