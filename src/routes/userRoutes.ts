import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import setUserDataOnReq from '../middleware/setUserData';
import { createResponse } from '../utils/requests';

const userRouter = Router();

userRouter.post('/', registerUser);

userRouter.get('/', setUserDataOnReq, (req, res) =>
  res.status(200).json(createResponse(200, { message: 'valid user' }))
);

export default userRouter;
