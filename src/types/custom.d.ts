import { MSUserData } from './User';

declare global {
  namespace Express {
    interface Request {
      user: MSUserData;
    }
  }
}
