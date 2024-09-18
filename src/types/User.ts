import { ObjectId } from 'mongodb';

interface User {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    registration_date: number;
    isSeller: boolean;
}

export default User;
