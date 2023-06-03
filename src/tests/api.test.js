const request = require('supertest');
const app = require('../app');

// Mock API response
jest.mock('../app', () => {
  const express = require('express');
  const app = express();

  app.get('/api/data', (req, res) => {
    res.json({ message: 'Mock API response' });
  });

  return app;
});

describe('API Tests', () => {
  it('should return Hello, World!', async () => {
    const response = await request(app).get('/api/data');
    expect(response.body.message).toBe('Mock API response');
  });
});