import { Router } from 'express';
import { uploadUserProfilePic } from '../controllers/imageController';

const imageRouter = Router();

imageRouter.post('/', uploadUserProfilePic);

export default imageRouter;
