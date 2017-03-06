import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CommentLogin from '../../src/components/CommentLogin';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('CommentLogin', () => {
  it('show login button with url', () => {
    const url = "url to login";
    const component = renderIntoDocument(
      <CommentLogin url={url} />
    );
    const a = scryRenderedDOMComponentsWithTag(component, 'a');
    expect(a[0].href).to.equal(url);
  });
});
