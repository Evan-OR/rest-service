import { ObjectId } from 'mongodb';

export type User = {
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    registration_date: number;
    isSeller: boolean;
};

export type RequestUserData = {
    email: string;
    name: string;
};

export type UserData = {
    '@odata.context': string;
    businessPhones: string[];
    displayName: string;
    givenName: string;
    id: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string | null;
    officeLocation: string | null;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
};
