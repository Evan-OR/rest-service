import 'tsconfig-paths/register';
import express from 'express';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import getDatabaseConnection from './utils/databaseConnection';
import cors from 'cors';
// import { parseStringPromise } from 'xml2js';
import userRouter from './routes/userRoutes';
import verifyMsToken from './middleware/verifyMsToken';
import imageRouter from './routes/imageRoutes';
import bidRouter from './routes/bidRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  const app = express();
  let corsOptions = {
    origin: '*',
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(fileUpload());

  app.use(express.text({ type: 'application/xml' }));

  // Setting db
  const { usersCollection, bidsCollection } = await getDatabaseConnection(process.env.MONGODB);

  app.set('usersCollection', usersCollection);
  app.set('bidsCollection', bidsCollection);

  // Routes
  app.use('/user', verifyMsToken, userRouter);

  app.use('/images', imageRouter);

  app.use('/bids', bidRouter);

  app.use('/xml', async (req, res) => {
    // const videoRequest = await fetch('http://48.209.33.228:8080/stat');
    // const data = await videoRequest.text();

    // // XML
    // const jsonData = await parseStringPromise(data, 'text/xml');
    // // STREAMS = jsonData.rtmp.server[0].application[0].live[0].stream
    // console.log(
    //   'streams',
    //   jsonData.rtmp.server[0].application[0].live[0].stream.map((stream) => stream.name[0])
    // );

    // res.setHeader('content-type', 'text/xml');

    res.json([{ title: 'Epic selling things' }, { title: 'Real selling stuff bruv' }]);
  });

  app.get('/', async (req: Request, res: Response) => res.status(200).json({ omg: 'working' }));

  app.listen(PORT, () => console.log('Listening on port http://localhost:' + PORT));
};

startServer();
