const request = require('request');
const { expect } = require('chai');

describe('API test', () => {
  const API_URL = 'http://localhost:7865';

  it('GET returns correct', (done) => {
    request.get(`${API_URL}/`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Welcome to the payment system');
      done();
    });
  });

  it('GET /cart/:id returns', (done) => {
    request.get(`${API_URL}/cart/97`, (_err, res, body) => {
      expect(res.statusCode).to.be.equal(200);
      expect(body).to.be.equal('Payment methods for cart 47');
      done();
    });
  });

  it('GET /cart/:id returns 404 response', (done) => {
    request.get(`${API_URL}/cart/-20`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('GET /cart/:id returns 404 response', (done) => {
    request.get(`${API_URL}/cart/d100-4355-9he6`, (_err, res, _body) => {
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });
});
