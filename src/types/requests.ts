import { Request } from 'express';
import { MSUserData } from './User';

export interface IRequestWithUserInfo extends Request {
  user: MSUserData;
}

export type CompletedBid = {
  _id: string;
  seller: string;
  buyerId: string;
  buyerName: string;
  title: string;
};
