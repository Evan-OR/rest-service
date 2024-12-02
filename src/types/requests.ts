import { Request } from 'express';
import { MSUserData } from './User';

export interface IRequestWithUserInfo extends Request {
  user: MSUserData;
}
