const Browser = require('zombie');
var mongoose = require('mongoose');
var app = require('../app');
var chai = require('chai');
var assert = require('assert');
var expect = require('expect');
assert = chai.assert;
expect = chai.expect;

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:3000
Browser.localhost('localhost', 3000);

describe('User visits the root path', function() {
  const browser = new Browser();

  before(function(done) {
    browser.visit('/', done)
  });

  it('should see the chat page', function() {
    console.log('The current path (expecting /): ')
    console.log(browser.location.href);
    browser.assert.text('title', 'BabelChat');
  });
})

xdescribe('User visits signup page', function() {

  const browser = new Browser();

  before(function(done) {
    browser.visit('/signup', done);
  });

  describe('submits form', function() {

    before(function(done) {
      console.log('The current path (before signup button pressed: ');
      console.log(browser.location.href);
      browser
        .fill('email',    'zombie@underworld.dead')
        .fill('password', 'eat-the-living')
        .pressButton('Signup', done);
    })

    it('should see the chat page', function() {
      console.log('The current path (expecting /): ')
      console.log(browser.location.href);

      browser.assert.text('title', 'BabelChat');
    });

    after((done) => {
      mongoose.connection.collections.users.drop(() => {
        done();
      });
    });
  });
});
