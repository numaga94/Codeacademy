console.log = function () {};
const { assert } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('js/app.js', 'utf8');

describe('', function () {
  it('Did you add an `emailClasses` property on `computed` with a value of the provided function?', function () {
    let structure = function () {
      const app = new Vue({
        computed: {
          emailClasses: function () {
            return {
              touched: this.email.length !== 0,
              invalid: this.email && !this.emailIsValid
            };
          }
        }
      });
    };

    let isMatch = Structured.match(code, structure);
    assert.isOk(isMatch);
  });
});
