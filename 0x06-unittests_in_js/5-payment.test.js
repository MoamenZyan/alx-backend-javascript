const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('send Payment Request To Api', () => {
  let BigB;

  beforeEach(() => {
    if (!BigB) {
      BigB = sinon.spy(console);
    }
  });

  afterEach(() => {
    BigB.log.resetHistory();
  });

  it('sendPaymentRequestToApi(100, 20) logs', () => {
    sendPaymentRequestToApi(100, 20);
    expect(BigB.log.calledWith('The total is: 120')).to.be.true;
    expect(BigB.log.calledOnce).to.be.true;
  });

  it('sendPaymentRequestToApi(10, 10) logs', () => {
    sendPaymentRequestToApi(10, 10);
    expect(BigB.log.calledWith('The total is: 20')).to.be.true;
    expect(BigB.log.calledOnce).to.be.true;
  });
});
