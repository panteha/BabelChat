import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe('<EmojiBox />', () => {
  it('selects an emoji', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiBox onSelect={callback} />);
    dom.find('#happy').simulate('click');
    expect(callback.calledOnce).to.be.true;
  });
  it('selects the right emoji', () => {
    var callback = sinon.spy();
    const dom = mount(<EmojiBox onSelect={callback} />);
    dom.find('#happy').simulate('click');
    expect(callback.calledWith('😊')).to.be.true;
  });
});
