import { IRequestWithUserInfo } from '@/types/requests';
import { User } from '@/types/User';
import { createResponse } from '@/utils/requests';
import { createUsername } from '@/utils/userUtils';
import { Response } from 'express';
import { Collection } from 'mongodb';

export const registerUser = async (req: IRequestWithUserInfo, res: Response) => {
  const userData = req.user;

  const formattedUser: User = {
    ...userData,
    username: createUsername(userData.givenName, userData.surname, userData.mail),
    isSeller: false,
    registration_date: Date.now(),
  };

  try {
    const usersCollection = req.app.get('usersCollection') as Collection<User>;

    const result = await usersCollection.updateOne(
      { email: userData.mail },
      {
        $setOnInsert: formattedUser,
      },
      { upsert: true }
    );

    if (!result.acknowledged) throw new Error('Error inserting user data');

    return res.send(createResponse(200, { message: 'working!' }));
  } catch (e) {
    console.log(e);
    return res.send(createResponse(500, { message: 'Error inserting user data!' }));
  }
};
