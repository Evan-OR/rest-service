import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
import { Request, Response } from 'express';
import getDatabaseConnection from './utils/databaseConnection';
import cors from 'cors';

dotenv.config();

const startServer = async () => {
    const app = express();
    let corsOptions = {
        origin: ['http://localhost:3000'],
    };

    app.use(cors(corsOptions));

    app.use(express.json());

    // Routes
    app.use('/auth', authRouter);

    // Setting db
    const { usersCollection } = await getDatabaseConnection(process.env.MONGODB);

    app.set('usersCollection', usersCollection);

    app.get('/', async (req: Request, res: Response) => res.status(200).json({ omg: 'working' }));

    app.listen(3002, () => console.log('Listening on port ' + 3002));
};

startServer();
