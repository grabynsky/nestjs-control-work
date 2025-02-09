import { ApiProperty } from '@nestjs/swagger';

import { UserID } from '../../../../common/types/entity-ids.type';
import { UserResDto } from '../../../users/models/dto/res/user.res.dto';

export class PostResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Post ID',
  })
  id: string;

  @ApiProperty({
    example: 'Post Title',
    description: 'Post Title',
  })
  title: string;

  @ApiProperty({
    example: 'Post Description',
    description: 'Post Description',
  })
  description: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Post Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Post Updated Date',
  })
  updated: Date;

  user?: UserResDto;
}
