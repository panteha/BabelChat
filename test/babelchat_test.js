import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SelectLanguage, MessageList, SendMessage } from '../src/babelchat';
require('../app');
var io = require('socket.io-client');

describe("SelectLanguage", function(){
  it("dropdown contains more than one language to choose from", function(done){
    var socket = io.connect("http://localhost:3000");
    const dom = mount(<SelectLanguage language="en" onChange="" socket={socket} />);
    setTimeout(function() {
      expect(dom.find('option').length > 1).to.be.true;
      done();
    }, 500);
  });
});

describe("MessageList", function(){
  it("when a message is sent, the message will show up", function(done){
    var socket = io.connect("http://localhost:3000");
    const dom = mount(<MessageList language="en" socket={socket} />);
    socket.emit('chat message',"Hello");
    setTimeout(function() {
      expect(dom.find('li').text()).to.have.string("Hello");
      done();
    }, 500);
  })
});

describe("SendMessage", function(){
  it("when the form is submitted, a message is sent", function(done){
    var spy = sinon.spy();
    const dom = mount(<SendMessage socket={{emit: spy }} />);
    dom.find('.textbox').simulate('change', {target: {value: 'Hello'}});
    dom.find('form').simulate('submit');
    expect(spy.calledWith('chat message', 'Hello')).to.be.true;
    done();
  })
});
