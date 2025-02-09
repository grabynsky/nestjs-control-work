import { ListUserQueryDto } from '../req/list-user-query.dto';
import { UserResDto } from './user.res.dto';

export class ListUserQueryResDto extends ListUserQueryDto {
  data: UserResDto[];
  total: number;
}
