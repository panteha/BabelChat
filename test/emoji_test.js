import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { EmojiBox, Emoji, EmojiTextBox } from '../emoji';

describe('<EmojiBox />', () => {
  it('selects an emoji', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiBox onSelect={callback} />);
    dom.find('.happy').simulate('click');
    expect(callback.calledOnce).to.be.true;
  });

  it('selects the right emoji', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiBox onSelect={callback} />);
    dom.find('.happy').simulate('click');
    expect(callback.calledWith('😊')).to.be.true;
  });

});

describe('<Emoji />', () => {
  it('contains an emoji', () => {
    const dom = mount(<Emoji type="happy" />);
    var text = dom.find('.happy').text();
    expect(text).to.have.string('😊');
  });

  it('responds to onClick', () => {
    var callback = sinon.spy();
    const dom = mount(<Emoji type="cool" onClick={callback} />);
    dom.find('.cool').simulate('click');
    expect(callback.calledWith('😎')).to.be.true;
  });

});

describe('<EmojiTextBox />', () => {
  it('when you click an emoji, it is added to the text box', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiTextBox value='' onChange={callback} />);
    dom.find('.cool').simulate('click');
    expect(callback.calledWith('😎')).to.be.true;
  });

  it('adds new emojis to the end of the previous emoji', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiTextBox value='' onChange={callback} />);
    dom.find('.cool').simulate('click');
    expect(callback.calledWith('😎')).to.be.true;
    dom.find('.happy').simulate('click');
    expect(callback.calledWith('😊')).to.be.true;
  });

});
