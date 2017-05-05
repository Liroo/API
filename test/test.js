require('../lib/config');
// const assert = require('assert');
const request = require('request');
/*
  Run async server
*/
new Promise(() => {
  require('../index');
});

describe('Server is well running', () => {
  describe('/api/info', () => {
    it('should return app name and app version', (done) => {
      request('http://localhost:3000/api/info', (error, response, body) => {
        if (response.statusCode === 200) {
          done();
          return;
        }
        done('failed');
      });
    });
  });


  describe('/api/remote-exit', () => {
    it('/api/remote-exit', (done) => {
      request('http://localhost:3000/api/remote-exit', (error, response, body) => {
        if (response.statusCode === 200) {
          done();
          return;
        }
        done('failed');
      });
    });
  });
});
