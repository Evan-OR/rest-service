import status from 'statuses';
import { IncomingHttpHeaders } from 'http';
import { USER_HEADERS } from './requestConstants';
import { MSUserData } from '../types/User';

export const createResponse = (statusCode: number, data?: Record<string, string>) => {
  return {
    statusCode: statusCode,
    statusMessage: status(statusCode),
    ...(data && data),
  };
};

export const getUserDataFromHeader = (headers: IncomingHttpHeaders) => {
  const headerData = headers[USER_HEADERS.X_USER_Data] as string;
  const userData = JSON.parse(headerData) as MSUserData;
  return userData;
};
