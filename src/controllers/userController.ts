import { Response } from 'express';
import { Collection } from 'mongodb';
import { IRequestWithUserInfo } from '../types/requests';
import { MSUserData, User } from '../types/User';
import { createResponse } from '../utils/requests';

export const registerUser = async (req: IRequestWithUserInfo, res: Response) => {
  console.log(req.body);
  const userData = req.body['userData'] as MSUserData;

  const formattedUser: User = {
    ...userData,
    username: userData.givenName,
    isSeller: false,
    registration_date: Date.now(),
    wallet: 200,
  };

  try {
    const usersCollection = req.app.get('usersCollection') as Collection<User>;

    const result = await usersCollection.findOneAndUpdate(
      { email: userData.mail },
      { $setOnInsert: formattedUser },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );

    if (!result) throw new Error('Error inserting or updating user data');

    return res.send(createResponse(200, { message: 'working!', userData: result }));
  } catch (e) {
    console.log(e);
    return res.send(createResponse(500, { message: 'Error inserting user data!' }));
  }
};
