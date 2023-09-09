import { Request } from 'express';
import { IUserEntity } from '~/entity/user.entity';

export interface UserRequest extends Request {
  user: IUserEntity | null;
}
