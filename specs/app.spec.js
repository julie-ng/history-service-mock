// eslint-disable-next-line no-unused-vars
import { app } from '~/app';
import request from 'request';

const port = process.env.PORT || 3000;

describe ('app', () => {
  describe ('GET /api/history/random', () => {
    it ('returns json', (done) => {
      request.get(url('/api/history/random'), (error, response, body) => {
        expect(response.statusCode).toBe(200);

        let json = JSON.parse(response.body);
        expect(json.fullname).toBeDefined();
        expect(json.accountHistory).toBeDefined();
        done();
      });
    });
  });
});

function url (path = '') {
  return `http://localhost:${port}` + path;
}
