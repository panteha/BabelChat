// TODO: test SelectLanguage: test that it contains some languages
// TODO: test MessageList: test that a message shows up
// TODO: test SendMessage: when the form is submitted, a message is sent
// TODO: test BabelChat: check that when the language is changed, the displayed messages change

import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { SelectLanguage } from '../babelchat';
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
