
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our messages model for our unit testing.
var Message = require('../models/message')

describe('Model Message Tests', function(){

 after((done) =>  {
    mongoose.connection.collections.items.drop(() => {
      done();
    });
  });
})

describe("Get all messages", function(){
         // Test will pass if we get all messages
        it("should return all messages", function(done){
            var MessageMock = sinon.mock(Message);
            var expectedResult = {status: true, messages: []};
            MessageMock.expects('find').yields(null, expectedResult);
            Message.find(function (err, result) {
                MessageMock.verify();
                MessageMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });
    });

// Test will pass if we fail to get a message
        it("should return error", function(done){
            var MessageMock = sinon.mock(Message);
            var expectedResult = {status: false, error: "Something went wrong"};
            MessageMock.expects('find').yields(expectedResult, null);
            Message.find(function (err, result) {
                MessageMock.verify();
                MessageMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });

// Test will pass if the message is saved
    describe("Post a new message", function(){
        it("should create new post", function(done){
            var MessageMock = sinon.mock(new Message({ message: 'Save new message from mock'}));
            var message = MessageMock.object;
            var expectedResult = { status: true };
            MessageMock.expects('save').yields(null, expectedResult);
            message.save(function (err, result) {
                MessageMock.verify();
                MessageMock.restore();
                expect(result.status).to.be.true;
                done();
            });
        });
        // Test will pass if the message is not saved
        it("should return error, if post not saved", function(done){
            var MessageMock = sinon.mock(new Message({ message: 'Save new message from mock'}));
            var message = MessageMock.object;
            var expectedResult = { status: false };
            MessageMock.expects('save').yields(expectedResult, null);
            message.save(function (err, result) {
                MessageMock.verify();
                MessageMock.restore();
                expect(err.status).to.not.be.true;
                done();
            });
        });
    });
