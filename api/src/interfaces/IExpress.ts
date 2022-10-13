import { Request } from 'express';
import IUser from './IUser';

export interface IUserInfoRequest extends Request {
  user?: IUser | undefined;
}
