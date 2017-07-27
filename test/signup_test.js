const Browser = require('zombie');
var mongoose = require('mongoose');
var app = require('../app');
var chai = require('chai');
var assert = require('assert');
var expect = require('expect');
assert = chai.assert;
expect = chai.expect;

Browser.localhost('localhost', 3000);

describe('User visits the root path', function() {
  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done)
  });

  it('should see the login page', function() {
    browser.assert.text('title', 'Node Authentication');
  });
})

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/signup', done);
  });

  describe('submits form', function() {

    before(function(done) {
      browser
        .fill('email',    'zombie@underworld.dead')
        .fill('password', 'eat-the-living')
        .pressButton('Signup', done);
    })

    after((done) => {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });
});
