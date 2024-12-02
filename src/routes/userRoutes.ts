import { registerUser } from '@/controllers/userController';
import { Router } from 'express';

const userRouter = Router();

userRouter.post('/', registerUser);

export default userRouter;
