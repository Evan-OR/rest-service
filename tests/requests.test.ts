import { createResponse } from '../src/utils/requests';

jest.mock('http', () => ({
  status: jest.fn((code) => `Status ${code}`),
}));

describe('createResponse', () => {
  it('should return correct structure with data', () => {
    const response = createResponse(200, { message: 'Success' });
    expect(response).toEqual({
      statusCode: 200,
      statusMessage: 'OK',
      message: 'Success',
    });
  });

  it('should return correct structure without data', () => {
    const response = createResponse(404);
    expect(response).toEqual({
      statusCode: 404,
      statusMessage: 'Not Found',
    });
  });

  it('should handle empty object data correctly', () => {
    const response = createResponse(201, {});
    expect(response).toEqual({
      statusCode: 201,
      statusMessage: 'Created',
    });
  });

  it('should not include data if undefined', () => {
    const response = createResponse(500, undefined);
    expect(response).toEqual({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  });
});
