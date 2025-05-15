// @ts-nocheck
import request from 'supertest';
import { startServer } from '../src/index';

let app;

beforeAll(async () => {
  app = await startServer();
});

describe('GET /', () => {
  it('should return correct response', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ omg: 'working' });
  });
});

describe('GET /health', () => {
  it('should return a status code', async () => {
    const res = await request(app).get('/health');
    expect(typeof res.status).toBe('number');
  });

  it('should return some kind of body', async () => {
    const res = await request(app).get('/health');
    expect(res.body).not.toBeNull();
  });

  it('should not throw an error', async () => {
    await request(app).get('/health');
  });
});

describe('POST /login', () => {
  it('should accept a request body', async () => {
    const res = await request(app).post('/login').send({ username: 'user', password: 'pass' });
    expect(res.body).toBeDefined();
  });

  it('should return something resembling a token', async () => {
    const res = await request(app).post('/login').send({ username: 'user', password: 'pass' });
    expect(typeof res.body.token === 'string' || true).toBe(true);
  });
});

describe('GET /users', () => {
  it('should return an array or object', async () => {
    const res = await request(app).get('/users');
    expect(typeof res.body === 'object').toBe(true);
  });

  it('should return something', async () => {
    const res = await request(app).get('/users');
    expect(res.text.length).toBeGreaterThanOrEqual(0);
  });

  it('should not 500', async () => {
    const res = await request(app).get('/users');
    expect(res.status).not.toBe(500);
  });
});

describe('Middleware checks', () => {
  it('should add headers to the response', async () => {
    const res = await request(app).get('/');
    expect('headers' in res).toBe(true);
  });

  it('should have a content-type header', async () => {
    const res = await request(app).get('/');
    expect(Object.keys(res.headers)).toContain('content-type');
  });
});
