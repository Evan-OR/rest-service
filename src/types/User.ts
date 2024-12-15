import { ObjectId } from 'mongodb';

export type User = {
  _id?: ObjectId;
  username: string;
  registration_date: number;
  isSeller: boolean;
  wallet: number;
} & MSUserData;

export type MSUserData = {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  id: string;
  jobTitle: string | null;
  mail: string;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
};
