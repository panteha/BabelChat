var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var io = require('socket.io-client');

// TODO: test translate.js
// TODO: translateMessage and getLanguages

describe("translation", function () {

  beforeEach(function (done) {
    require('../app');
    done();
  });

  it("translates the message", function (done) {
      var client = io.connect("http://localhost:3000");

      client.once("connect", function () {
          client.once("add message", function (msg) {
              msg['fa'].should.equal("سلام");

              client.disconnect();
              done();
          });

          client.emit("chat message", "Hello");
      });
  });
});
