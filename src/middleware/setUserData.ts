import { NextFunction, Response } from 'express';
import { IRequestWithUserInfo } from '../types/requests';
import { User } from '../types/User';

const setUserDataOnReq = (req: IRequestWithUserInfo, res: Response, next: NextFunction) => {
  try {
    const userData = JSON.parse(req.headers['x-user-data'] as string) as User;
    req.user = userData;
  } catch (error) {
    console.log(error);
  }

  next();
};

export default setUserDataOnReq;
