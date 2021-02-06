console.log = function () {};
const { assert } = require('chai');
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('js/app.js', 'utf8');

describe('', function () {
  it('Did you add a `formIsValid` property on `computed` with a value of the provided function?', function () {
    let structure = function () {
      const app = new Vue({
        computed: {
          formIsValid: function () {
            return this.firstName && this.lastName && this.email && this.purchaseAgreementSigned;
          }
        }
      });
    };

    let isMatch = Structured.match(code, structure);
    assert.isOk(isMatch);
  });
});
