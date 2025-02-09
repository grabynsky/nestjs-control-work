import { PickType } from '@nestjs/swagger';

import { BasePostReqDto } from './base-post.req.dto';

export class UpdatePostDto extends PickType(BasePostReqDto, [
  'title',
  'description',
]) {}
