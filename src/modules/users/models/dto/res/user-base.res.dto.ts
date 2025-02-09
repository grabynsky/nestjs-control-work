export class UserBaseResDto {
  readonly id: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly age?: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string;
  created_at: Date;
  update_at: Date;
}
