import { Router } from 'express';
import { resgisterUser } from '../controllers/authController';

const authRouter = Router();

authRouter.get('/', resgisterUser);

export default authRouter;
