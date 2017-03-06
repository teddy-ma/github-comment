import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CommentAlert from '../../src/components/CommentAlert';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('CommentAlert', () => {
  it('show message', () => {
    const message = "hello world";
    const component = renderIntoDocument(
      <CommentAlert message={message} />
    );
    const p = scryRenderedDOMComponentsWithTag(component, 'p');
    expect(p[0].textContent).to.equal(message);
  });
});
