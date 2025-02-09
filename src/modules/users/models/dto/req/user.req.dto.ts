import { PickType } from '@nestjs/swagger';

import { BaseUserReqDto } from './base-user.req.dto';

export class UserReqDto extends PickType(BaseUserReqDto, [
  'firstName',
  'lastName',
  'email',
  'phone',
  'age',
  'password',
  'role',
]) {}
