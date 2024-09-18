import status from 'statuses';

export const createResponse = (errorCode: number, data?: Record<string, string>) => {
    return {
        statusCode: errorCode,
        statusMessage: status(errorCode),
        ...(data && data),
    };
};
