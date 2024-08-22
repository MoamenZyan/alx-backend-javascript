const { expect } = require('chai');

describe('Testing', () => {
  it('1 is 1', () => {
    expect(1 === 1).to.be.true;
  });

  it('2 is 2', () => {
    expect(2 === 2).to.be.true;
  });

  it.skip('1 is 3', () => {
    expect(1 === 3).to.be.true;
  });

  it('3 is 3', () => {
    expect(3 === 3).to.be.true;
  });

  it('4 is 4', () => {
    expect(4 === 4).to.be.true;
  });

  it('5 is 5', () => {
    expect(5 === 5).to.be.true;
  });

  it('6 is 6', () => {
    expect(6 === 6).to.be.true;
  });

  it('7 is 7', () => {
    expect(7 === 7).to.be.true;
  });
});
