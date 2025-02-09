import { Global, Module } from '@nestjs/common';

import { PostRepository } from './services/post.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository, PostRepository, RefreshTokenRepository];

@Global()
@Module({
  imports: [],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
