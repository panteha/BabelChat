var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var io = require('socket.io-client');

describe("translation", function () {
  var server,
    options ={
      transports: ['websocket'],
      'force new connection': true
    };

  beforeEach(function (done) {
    server = require('../index').server;
    done();
  });

  it("translates the message", function (done) {
      var client = io.connect("http://localhost:3000", options);

      client.once("connect", function () {
          client.once("add message", function (msg) {
              msg.should.equal("سلام");

              client.disconnect();
              done();
          });

          client.emit("chat message", "Hello");
      });
  });
});
