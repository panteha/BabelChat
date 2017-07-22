import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { EmojiBox, Emoji } from '../emoji';

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
    var text = dom.find('.cool').simulate('click');
    expect(callback.calledWith('😎')).to.be.true;
  });
});
