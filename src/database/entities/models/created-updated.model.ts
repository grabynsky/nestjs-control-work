import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class CreatedUpdatedModel {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
