console.log = () => {};
const { expect } = require('chai');
const rewire = require('rewire');
const Vue = require('vue');

describe('', function () {
  it('', function () {
    const appModule = rewire('../js/app.js');
    const vueApp = appModule.__get__('app');
    expect(vueApp).to.exist();
  });
});
