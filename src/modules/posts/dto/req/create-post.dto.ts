import { PickType } from '@nestjs/swagger';

import { BasePostReqDto } from './base-post.req.dto';

export class CreatePostDto extends PickType(BasePostReqDto, [
  'title',
  'description',
]) {}
