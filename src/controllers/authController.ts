import { Request, Response } from 'express';
import User from '../types/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Collection, MongoServerError } from 'mongodb';
import { createResponse } from '../utils/requests';

export const resgisterUser = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser: User = {
            email,
            username,
            password: hashedPassword,
            registration_date: Date.now(),
            isSeller: false,
        };

        const usersCollection = req.app.get('usersCollection') as Collection<User>;
        const result = await usersCollection.insertOne(newUser);

        const userAuthToken = generateAuthToken({ _id: result.insertedId, ...newUser });

        return res.status(200).json(createResponse(200, { token: userAuthToken }));
    } catch (err) {
        if (err instanceof MongoServerError && err.code == 11000) {
            return res.status(409).json(createResponse(409, { detail: 'Email already in use!' }));
        }

        return res.status(500).json(createResponse(500));
    }
};

const generateAuthToken = (user: User): string => {
    // filter password from being added to signed data
    const signData = { ...Object.entries(user).filter(([key, value]: [string, any]) => key !== 'password') };
    const token = jwt.sign({ ...signData }, process.env.SECRET, {
        algorithm: 'HS512',
        expiresIn: '1h',
    });

    return token;
};
