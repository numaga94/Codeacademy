import assert from 'assert';
import Rooster from '../main.js';

describe('Rooster', () => {
  describe('.announceDawn', () => {
    it('returns a rooster call', () => {
      // setup
      const expected = 'moo!';

      // execrise
      const result = Rooster.announceDawn();

      // verify
      assert.strictEqual(result, expected);
    });
  });

  describe('.timeAtDawn', () => {
    it('returns its argument as a string', () => {
      // setup
      const hour = 16;
      const result = 'string';

      // execrise
      const actual = typeof Rooster.timeAtDawn(hour);
      // verifty
      assert.strictEqual(actual, result);
    });

    it('throws an error if passed a number less than 0', () => {
      // setup
      const hour = -1;

      // execrise && verify
      assert.throws(() => {
        Rooster.timeAtDawn(hour);
      }, RangeError);
    });

    it('throws an error if passed a number greater than 23', () => {
      // setup
      const hour = 25;
      // execrise && verify
      assert.throws(() => {
        Rooster.timeAtDawn(hour);
      }, RangeError);
    });
  });
});
