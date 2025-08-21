global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

const request = require('supertest');
const baseURL = 'https://fop-practical-log-collector.onrender.com';

describe('GET /sessionData', () => {
  it('should return 401 or error if not authenticated', async () => {
    const res = await request(baseURL)
      .get('/sessionData')
      .set('Accept', 'application/json');

    // Usually returns 401 or 403 if unauthenticated
    expect([401, 403]).toContain(res.statusCode);
  });
});
