import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreatedUpdatedModel } from './models/created-updated.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.POST)
export class PostEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: PostID;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.postEntity)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
