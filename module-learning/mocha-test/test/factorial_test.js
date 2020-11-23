import assert from 'assert';
import Calculate from '../factorial.js';

describe('Calculate', () => {
  describe('.factorial', () => {
    it('return of 5! is 120', () => {
      // setup
      const inputNum = 5;
      const expected = 120;
      // execrise
      const actual = Calculate.factorial(inputNum);
      // verification
      assert.strictEqual(actual, expected);
    });

    it('return of 3! is 6', () => {
      // setup
      const inputNum = 3;
      const expected = 6;
      // execrise
      const actual = Calculate.factorial(3);
      // verification
      assert.strictEqual(actual, expected);
    });

    it('return of 0! is 1', () => {
      // setup
      const inputNum = 0;
      const expected = 1;
      // execrise
      const actual = Calculate.factorial(inputNum);
      // verification
      assert.strictEqual(actual, expected);
    });

    it('inputNum must be a number', () => {
      // setup
      const inputNum = '0';
      // execrise
      const actual = () => {
        Calculate.factorial(inputNum);
      };
      // verification
      assert.throws(actual, /.factorial method takes only number as input/);
    });
  });
});
