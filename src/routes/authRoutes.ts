import { Request, Response, Router } from 'express';
import { resgisterUser } from '../controllers/authController';
import verifyMsToken from '../middleware/verifyMsToken';

const authRouter = Router();

authRouter.get('/', resgisterUser);
authRouter.get('/test', verifyMsToken, (req: Request, res: Response) => {
    console.log(req.cookies);

    return res.status(200).json({ message: 'YOU HAVE BEEN AUTHORISED', user: req['user'] });
});

export default authRouter;
