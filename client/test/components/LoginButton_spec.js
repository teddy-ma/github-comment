import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LoginButton from '../../src/components/LoginButton';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = TestUtils;

describe('LoginButton', () => {
    it('show login button with url', () => {
        const url = "url to login";
        const component = renderIntoDocument(
            <LoginButton url={url} />
        );
        const a = scryRenderedDOMComponentsWithTag(component, 'a');
        expect(a[0].href).to.equal(url);
    });
});