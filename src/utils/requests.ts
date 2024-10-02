import status from 'statuses';
import { IncomingHttpHeaders } from 'http';
import { USER_HEADERS } from './requestConstants';
import { UserData } from '../types/User';

export const createResponse = (errorCode: number, data?: Record<string, string>) => {
    return {
        statusCode: errorCode,
        statusMessage: status(errorCode),
        ...(data && data),
    };
};

export const getUserDataFromHeader = (headers: IncomingHttpHeaders) => {
    const headerData = headers[USER_HEADERS.X_Data] as string;
    const userData = JSON.parse(headerData) as UserData;
    return userData;
};
