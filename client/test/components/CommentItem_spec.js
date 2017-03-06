import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CommentItem from '../../src/components/CommentItem';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('CommentItem', () => {
  it('show comment item', () => {
    const text = "hello world";
    const name = "zhangsan";
    const avatar = "avatar_url";
    const component = renderIntoDocument(
      <CommentItem name={name} avatar={avatar} text={text} />
    );
    const img = scryRenderedDOMComponentsWithTag(component, 'img');
    expect(img[0].src).to.equal(avatar);
    expect(img[0].title).to.equal(name);

    const p = scryRenderedDOMComponentsWithTag(component, 'p');
    expect(p[0].textContent).to.equal(text);
  });
});
